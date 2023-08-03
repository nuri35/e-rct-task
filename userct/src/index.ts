import { databaseSource } from './database/dataSource';
import { logger } from './logger/CustomLogger';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.JWT_EXPIRES_IN) {
      throw new Error('JWT_EXPIRES_IN must be defined');
    }

    if (!process.env.PORT) {
      throw new Error('PORT must be defined');
    }

    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }

    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }

    logger.client.info('Starting up...one moment please');
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

    await databaseSource.createConnection();
    logger.client.info('Connected to database');
    const app = (await import('./app')).app;
    app.listen(process.env.PORT, () => {
      logger.client.info(`Listening on port ${process.env.PORT}!!!`);
    });
  } catch (err: any) {
    logger.client.error(err.message);
  }
};

start();
