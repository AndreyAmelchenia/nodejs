const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/tasks.router');
const { morgan, optionMorgan } = require('./resources/logger/morgan');
const {
  handleMiddlewareErrors,
  handleMiddlewareUncaught
} = require('./resources/helper/catchErrors');

const { loggerInfo } = require('./resources/logger/winston');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(morgan(optionMorgan, { stream: loggerInfo.stream }));

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

process.on('uncaughtException', error => {
  handleMiddlewareUncaught(error);
});

process.on('unhandledRejection', error => {
  handleMiddlewareUncaught(error);
});

// PUT IT HERE
// Promise.reject(Error('unhandledRejection Oops!'));

// setTimeout(() => {
//   throw Error('Oops!');
// }, 1500);

module.exports = app;
