import amqp from 'amqplib';

let cnt;

const EXCHANGE_NAME = 'user_exchange';
const queue_key = {
  register: {
    queue: 'register',
    routing_key: 'user.register',
  },
};

const connect_rabbit_mq = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, 'direct');
  await channel.assertQueue(queue_key.register.queue);
  await channel.bindQueue(queue_key.register.queue, EXCHANGE_NAME, queue_key.register.routing_key);
  cnt = channel;
};

export { connect_rabbit_mq, cnt as channel, EXCHANGE_NAME, queue_key };
