import { v4 as uuid } from 'uuid';

import Error from '../helpers/error.js';
import { hashPassword } from '../helpers/hashPassword.js';
import { register_service } from '../services/register.js';
import { channel } from '../config/rabbitmq.js';
import Message from '../helpers/error.js';
import Auth from '../models/auth.js';

const register = async (req, res) => {
  const credentials = req.body;

  if (credentials.password != credentials.password_confirm) {
    return res.json(new Error('Passwords are not same', false));
  }

  const password = hashPassword(credentials.password);
  const saved = await register_service(credentials.email, password);

  if (!saved.success) {
    return res.json(saved);
  }

  const user_credentials = {
    email: credentials.email,
    username: credentials.username,
    name: credentials.name,
    surname: credentials.surname,
    user_id: saved.data.user_id,
  };

  const result = await handle_channel(user_credentials);

  let http_status = 201;
  if (!result.success) {
    await Auth.deleteOne({ user_id: user_credentials.user_id });
    http_status = 400;
  }

  res.status(http_status).json(result);
};

const handle_channel = async (user_credentials) => {
  try {
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const id = uuid();
    channel.publish('user_exchange', 'user.register', Buffer.from(JSON.stringify(user_credentials)), {
      correlationId: id,
      replyTo: queue,
    });
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
  } catch (error) {
    return new Message(['Error while creating user', error], false);
  }
};

export { register };
