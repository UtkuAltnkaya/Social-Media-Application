import amqp from 'amqplib';

let cnt;

const EXCHANGE_NAME = 'comment_exchange';
const queue_key = {
  post_comments: {
    queue: 'comment_post_comments',
    routing_key: 'comment.post_comments',
  },
  post_one_comment: {
    queue: 'comment_post_one_comment',
    routing_key: 'comment.post_one_comment',
  },
  user_comments: {
    queue: 'comment_user_comments',
    routing_key: 'comment.user_comments',
  },
  post_delete_comments: {
    queue: 'comment_post_delete_comments',
    routing_key: 'comment.post_delete_comments',
  },
};

const connect_rabbit_mq = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, 'direct');

  for (const key in queue_key) {
    const queue = queue_key[key].queue;
    const routing_key = queue_key[key].routing_key;

    await channel.assertQueue(queue);
    await channel.bindQueue(queue, EXCHANGE_NAME, routing_key);
  }

  cnt = channel;
};

export { connect_rabbit_mq, cnt as channel, EXCHANGE_NAME, queue_key };
