const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/tasks.router');
const loginRouter = require('./resources/authorization/authorization.router');
const authorizationChecker = require('./helper/authorizationChecker');
const { morgan, optionMorgan } = require('./logger/morgan');
const {
  handleMiddlewareErrors,
  handleMiddlewareUncaught
} = require('./helper/catchErrors');

const { loggerInfo } = require('./logger/winston');

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

app.use('/users', authorizationChecker, userRouter);

app.use('/boards', authorizationChecker, boardRouter);

app.use('/boards/:boardId/tasks', authorizationChecker, taskRouter);

app.use('/login', loginRouter);

app.use(handleMiddlewareErrors);

process.on('uncaughtException', handleMiddlewareUncaught);

process.on('unhandledRejection', handleMiddlewareUncaught);

// PUT IT HERE
// Promise.reject(new Error('unhandledRejection Oops!'));

// setTimeout(() => {
// throw Error('Oops!');
// }, 1500);

module.exports = app;
