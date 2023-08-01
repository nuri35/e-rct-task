import expressWinston from 'express-winston';
import winston from 'winston';
const { createLogger, format, transports } = winston;

class Logger {
  private _logger: any;

  constructor() {
    this._logger = createLogger({
      transports: [
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.colorize(),
            format.simple()
          ),
        }),
      ],
    });
  }
  get client() {
    return this._logger;
  }
}
export const logger = new Logger();
