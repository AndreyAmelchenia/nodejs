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

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, 'info.log'),
      level: 'info',
      json: true,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 1
    }),
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
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

// const logger = ({ method, body, originalUrl }) => {
//   const log = createLogger({
//     level: 'silly',
//     format: format.combine(format.colorize(), format.cli()),
//     transports: [
//       // new transports.File({
//       //   filename: path.join(
//       //     __dirname,
//       //     `./log/${bool ? baseUrl.slice(1) : 'tasks'}.log`
//       //   ),
//       //   level: 'info',
//       //   format: format.combine(format.uncolorize())
//       // }),
//       new transports.File({
//         filename: path.join(__dirname, 'info.log'),
//         level: 'info',
//         format: format.combine(format.uncolorize())
//       })
//       // new transports.Console()
//     ]
//   });

//   log.info(`${date()} ${method} ${originalUrl} ${JSON.stringify(body)} `);
// };

// const loggerError = ({ statusCode }, error) => {
//   const log = createLogger({
//     level: 'silly',
//     format: format.combine(format.colorize(), format.cli()),
//     transports: [
//       new transports.File({
//         filename: path.join(__dirname, 'error.log'),
//         level: 'error',
//         format: format.combine(format.uncolorize())
//       })
//       // new transports.Console()
//     ]
//   });

//   log.error(`${date()} ${statusCode} ${JSON.stringify(error)}`);
// };
module.exports = { logger };
