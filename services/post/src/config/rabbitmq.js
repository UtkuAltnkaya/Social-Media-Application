import amqp from 'amqplib';

let cnt;

const EXCHANGE_NAME = 'post_exchange';
const queue_key = {
  user_posts: {
    queue: 'post_user_posts',
    routing_key: 'post.user_posts',
  },
};

const connect_rabbit_mq = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, 'direct');
  await channel.assertQueue(queue_key.user_posts.queue);
  await channel.bindQueue(queue_key.user_posts.queue, EXCHANGE_NAME, queue_key.user_posts.routing_key);
  cnt = channel;
};

export { connect_rabbit_mq, cnt as channel, EXCHANGE_NAME, queue_key };
