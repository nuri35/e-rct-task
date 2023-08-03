import { DataSource } from 'typeorm';
import Config from './configEnv';
import { logger } from '../logger/CustomLogger';

class DatabaseSource {
  private logger = logger;
  private _cn!: DataSource;

  get _connection() {
    return this._cn;
  }

  async createConnection() {
    try {
      const dbConfig = Config[`${process.env.NODE_ENV}`];
      this._cn = await new DataSource({
        type: 'postgres',
        host: dbConfig.host,
        port: parseInt(dbConfig.port),
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        synchronize: true,
        entities: ['src/entities/*.ts'],
      });

      await this._cn.initialize();

      this.logger.client.info('Database connection established');
    } catch (err: any) {
      this.logger.client.error(err.message);
    }
  }
}
export const databaseSource = new DatabaseSource();
