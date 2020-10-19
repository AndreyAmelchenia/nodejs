const { createLogger, format, transports } = require('winston');
const path = require('path');

const date = () =>
  new Date().toLocaleDateString('en-En', {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

const loggerInfo = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, './info/info.log'),
      level: 'info',
      json: true,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 1
    }),
    new transports.File({
      filename: path.join(__dirname, './info/error.log'),
      level: 'error',
      json: true,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 1
    })
  ],
  format: format.combine(
    format.simple(),
    format.timestamp({ format: date }),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  exitOnError: false
});

const loggerError = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, 'error.log'),
      level: 'error',
      json: true,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 1
    })
  ],
  format: format.combine(
    format.simple(),
    format.timestamp({ format: date }),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}\n`)
  ),
  exitOnError: false
});

loggerInfo.stream = {
  write(message) {
    loggerInfo.info(message);
  }
};

module.exports = { loggerInfo, loggerError };
