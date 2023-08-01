import { databaseSource } from './database/dataSource';
import { logger } from './logger/CustomLogger';

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.PORT) {
      throw new Error('PORT must be defined');
    }
    logger.client.info('Starting up...one moment please');
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
