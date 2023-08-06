import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { router } from './src/routers/index.js';
import { connect_db } from './src/config/db.js';
import { connect_rabbit_mq } from './src/config/rabbitmq.js';

const PORT = process.env.PORT || 3000;

const main = async () => {
  dotenv.config();
  connect_db();
  await connect_rabbit_mq();
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use('/auth', router);
  app.listen(PORT, () => {
    console.log(`Authentication Service listening on port ${PORT}`);
  });
};

try {
  main();
} catch (error) {
  console.error(error);
}
