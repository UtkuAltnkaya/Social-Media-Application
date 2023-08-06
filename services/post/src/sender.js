import { v4 as uuid } from 'uuid';
import { channel } from './config/rabbitmq.js';

const send_post_comments = async (post_id) => {
  const { queue } = await channel.assertQueue('', { exclusive: true });
  const id = uuid();
  channel.publish('comment_exchange', 'comment.post_comments', Buffer.from(JSON.stringify(post_id)), {
    correlationId: id,
    replyTo: queue,
  });

  const result = await wait_message(queue, id);
  return result;
};

const send_post_one_comment = async (post_id, comment_id) => {
  const { queue } = await channel.assertQueue('', { exclusive: true });
  const id = uuid();
  channel.publish(
    'comment_exchange',
    'comment.post_one_comment',
    Buffer.from(JSON.stringify({ post_id, comment_id })),
    {
      correlationId: id,
      replyTo: queue,
    },
  );

  const result = await wait_message(queue, id);
  return result;
};

const send_post_delete_comments = async (post_id) => {
  const { queue } = await channel.assertQueue('', { exclusive: true });
  const id = uuid();
  channel.publish('comment_exchange', 'comment.post_delete_comments', Buffer.from(JSON.stringify(post_id)), {
    correlationId: id,
    replyTo: queue,
  });

  const result = await wait_message(queue, id);
  return result;
};

const wait_message = async (queue, id) => {
  const result = await new Promise((resolve, _) => {
    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === id) {
        const result = JSON.parse(msg.content);
        channel.ack(msg);
        resolve(result);
      }
    });
  });

  return result;
};

export { send_post_comments, send_post_one_comment, send_post_delete_comments };
