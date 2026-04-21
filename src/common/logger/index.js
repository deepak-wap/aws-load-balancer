import winston from 'winston';
import chalk from 'chalk';
import config from '../../config/index.js';

// Define custom colors for levels
const colors = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.cyan,
  debug: chalk.gray,
};

// Custom format for console
const consoleFormat = winston.format.printf(({ timestamp, level, message }) => {
  const color = colors[level] || ((text) => text);
  return color(`${timestamp} [${level.toUpperCase()}]: ${message}`);
});

// Create logger
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
  ),
  transports: [
    // Colored console logs
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        consoleFormat
      ),
    }),
  ],
});

export default logger;