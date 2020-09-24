import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

if (!existsSync('logs')) {
  mkdirSync('logs');
}

const logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: 'logs/pebmed-%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
