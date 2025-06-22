import { createLogger, transports, format } from 'winston';
// this logger is used to log messages in the application.
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/gdsApp.log' }),
  ],
});

export default logger;
