import { channel, queue_key } from './config/rabbitmq.js';
import Message from './helpers/message.js';
import CommentService from './service.js';

const consume_post_comments = () => {
  channel.consume(queue_key.post_comments.queue, async (data) => {
    try {
      const id = JSON.parse(data.content);
      const comments = await CommentService.get_post_comments(id);
      channel.sendToQueue(data.properties.replyTo, Buffer.from(JSON.stringify(comments)), {
        correlationId: data.properties.correlationId,
      });
    } catch (error) {
      catch_error('Failed while fetching post comments', error, data.properties);
    } finally {
      channel.ack(data);
    }
  });
};

const consume_post_one_comment = () => {
  channel.consume(queue_key.post_one_comment.queue, async (data) => {
    try {
      const { post_id, comment_id } = JSON.parse(data.content);
      const comment = await CommentService.get_post_one_comment(post_id, comment_id);
      channel.sendToQueue(data.properties.replyTo, Buffer.from(JSON.stringify(comment)), {
        correlationId: data.properties.correlationId,
      });
    } catch (error) {
      catch_error('Failed while fetching post comment', error, data.properties);
    } finally {
      channel.ack(data);
    }
  });
};

const consume_user_comments = () => {
  channel.consume(queue_key.user_comments.queue, async (data) => {
    try {
      const user_id = JSON.parse(data.content);
      const comment = await CommentService.get_user_comments(user_id);
      channel.sendToQueue(data.properties.replyTo, Buffer.from(JSON.stringify(comment)), {
        correlationId: data.properties.correlationId,
      });
    } catch (error) {
      catch_error('Failed while deleting posts comments', error, data.properties);
    } finally {
      channel.ack(data);
    }
  });
};

const consume_post_delete_comments = () => {
  channel.consume(queue_key.post_delete_comments.queue, async (data) => {
    try {
      const post_id = JSON.parse(data.content);
      const comment = await CommentService.delete_all_comments(post_id);
      channel.sendToQueue(data.properties.replyTo, Buffer.from(JSON.stringify(comment)), {
        correlationId: data.properties.correlationId,
      });
    } catch (error) {
      catch_error('Failed while deleting posts comments', error, data.properties);
    } finally {
      channel.ack(data);
    }
  });
};

const catch_error = (message, error, properties) => {
  channel.sendToQueue(properties.replyTo, Buffer.from(JSON.stringify(new Message([message, error], false))), {
    correlationId: properties.correlationId,
  });
};

const consume = () => {
  consume_post_comments();
  consume_post_one_comment();
  consume_user_comments();
  consume_post_delete_comments();
};

export default consume;
