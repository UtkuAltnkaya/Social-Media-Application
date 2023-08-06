import express, { json } from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import router from './src/router.js';
import { connect_rabbit_mq } from './src/config/rabbitmq.js';
import consume from './src/consumer.js';

dotenv.config();

const PORT = process.env.PORT || 3003;

const main = async () => {
  await connect_rabbit_mq();
  consume();
  const app = express();
  app.use(json());
  app.use(cookieParser());
  app.use('/comment', router);
  app.listen(PORT, () => {
    console.log(`Comment Service listening on port ${PORT}`);
  });
};

try {
  main();
} catch (error) {
  console.error(error);
}
