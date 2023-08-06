import { channel, queue_key } from './config/rabbitmq.js';
import Message from './message.js';
import { create_user_service } from './service.js';

const consume_register = () => {
  channel.consume(queue_key.register.queue, async (data) => {
    try {
      const credentials = JSON.parse(data.content);
      const user = await create_user_service(credentials);
      channel.sendToQueue(data.properties.replyTo, Buffer.from(JSON.stringify(user)), {
        correlationId: data.properties.correlationId,
      });
    } catch (error) {
      channel.sendToQueue(
        data.properties.replyTo,
        Buffer.from(JSON.stringify(new Message('Failed while creating user', false))),
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
  consume_register();
};

export default consume;
