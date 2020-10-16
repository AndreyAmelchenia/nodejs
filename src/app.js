const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/tasks.router');
const morgan = require('morgan');
const {
  handleMiddlewareErrors,
  handleMiddlewareUncaughtException
} = require('./resources/helper/catchErrors');
const { logger } = require('./resources/logger/winston');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(morgan('combined', { stream: logger.stream }));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', taskRouter);

app.use(handleMiddlewareErrors);
// PUT IT HERE

process.on('uncaughtException', e => {
  handleMiddlewareUncaughtException(e);
});

process.on('unhandledRejection', e => {
  handleMiddlewareUncaughtException(e);
});

// PUT IT HERE
// Promise.reject(Error('unhandledRejection Oops!'));

// setTimeout(() => {
//   throw Error('Oops!');
// }, 1500);

module.exports = app;
