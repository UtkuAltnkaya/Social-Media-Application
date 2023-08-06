import express, { json } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import router from './src/router.js';
import { connect_rabbit_mq } from './src/config/rabbitmq.js';
import { connect_db } from './src/config/db.js';
import consume from './src/consumer.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const main = async () => {
  connect_db();
  await connect_rabbit_mq();
  const app = express();
  app.use(json());
  app.use(cookieParser());
  app.use('/user', router);
  consume();
  app.listen(PORT, () => {
    console.log(`User Service listening on port ${PORT}`);
  });
};

try {
  main();
} catch (error) {
  console.error(error);
}
