import { channel, queue_key } from './config/rabbitmq.js';
import Message from './helpers/message.js';
import PostService from './service.js';

const consume_get_post = () => {
  channel.consume(queue_key.user_posts.queue, async (data) => {
    try {
      const id = JSON.parse(data.content);
      const result = await PostService.find_user_posts(id);
      channel.sendToQueue(data.properties.replyTo, Buffer.from(JSON.stringify(result)), {
        correlationId: data.properties.correlationId,
      });
    } catch (error) {
      channel.sendToQueue(
        data.properties.replyTo,
        Buffer.from(JSON.stringify(new Message('Failed while fetching user posts', false))),
        {
          correlationId: data.properties.correlationId,
        },
      );
    } finally {
      channel.ack(data);
    }
  });
};

const consume = () => {
  consume_get_post();
};

export default consume;
