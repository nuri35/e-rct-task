import express from 'express';
import { json } from 'body-parser';
require('express-async-errors');
import { natsWrapper } from './nats-wrapper';
import { EmailCreatedListener } from './events/listeners/mail-created-listener';

const app = express();
app.set('trust proxy', true);
app.use(json());

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('Nats conection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    new EmailCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!!!`);
  });
};

start();
