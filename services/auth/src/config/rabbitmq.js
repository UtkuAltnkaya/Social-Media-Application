import amqp from 'amqplib';

let cnt;

const connect_rabbit_mq = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ);
  const channel = await connection.createChannel();
  cnt = channel;
};

export { connect_rabbit_mq, cnt as channel };
