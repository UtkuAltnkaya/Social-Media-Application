import { channel } from './config/rabbitmq.js';
import { v4 as uuid } from 'uuid';

async function wait_message(queue, id) {
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
}

class Sender {
  constructor() {}
  static async send_user_posts(user_id) {
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const id = uuid();
    channel.publish('post_exchange', 'post.user_posts', Buffer.from(JSON.stringify(user_id)), {
      correlationId: id,
      replyTo: queue,
    });

    const result = await wait_message(queue, id);
    return result;
  }
  static async send_user_comments(user_id) {
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const id = uuid();
    channel.publish('comment_exchange', 'comment.user_comments', Buffer.from(JSON.stringify(user_id)), {
      correlationId: id,
      replyTo: queue,
    });

    const result = await wait_message(queue, id);

    return result;
  }
  static async send_follow(user_id, follow_id) {
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const id = uuid();
    channel.publish('follow_exchange', 'follow.user_follow', Buffer.from(JSON.stringify({ user_id, follow_id })), {
      correlationId: id,
      replyTo: queue,
    });

    const result = await wait_message(queue, id);
    return result;
  }

  static async send_unfollow(user_id, follow_id) {
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const id = uuid();
    channel.publish('follow_exchange', 'follow.user_unfollow', Buffer.from(JSON.stringify({ user_id, follow_id })), {
      correlationId: id,
      replyTo: queue,
    });

    const result = await wait_message(queue, id);
    return result;
  }

  static async send_all_followers(user_id) {
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const id = uuid();
    channel.publish('follow_exchange', 'follow.user_all_followers', Buffer.from(JSON.stringify({ user_id })), {
      correlationId: id,
      replyTo: queue,
    });

    const result = await wait_message(queue, id);
    return result;
  }

  static async send_is_follows(user_id, follow_id) {
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const id = uuid();
    channel.publish('follow_exchange', 'follow.user_is_follows', Buffer.from(JSON.stringify({ user_id, follow_id })), {
      correlationId: id,
      replyTo: queue,
    });

    const result = await wait_message(queue, id);
    return result;
  }
}

export default Sender;
