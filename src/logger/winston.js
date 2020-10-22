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

const configFormat = format.combine(
  format.simple(),
  format.timestamp({ format: date }),
  format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
);

const configTransport = (pathFile, level) => ({
  filename: path.join(__dirname, pathFile),
  level,
  json: true,
  handleExceptions: true,
  maxsize: 5242880,
  maxFiles: 1
});

const loggerInfo = createLogger({
  transports: [
    new transports.File(configTransport('./info/info.log', 'info')),
    new transports.File(configTransport('./info/error.log', 'error'))
  ],
  format: configFormat,
  exitOnError: false
});

const loggerError = createLogger({
  transports: [
    new transports.File(configTransport('error.log', 'error')),
    new transports.Console()
  ],
  format: configFormat,
  exitOnError: true
});

loggerInfo.stream = {
  write(message) {
    loggerInfo.info(message);
  }
};

module.exports = { loggerInfo, loggerError };
