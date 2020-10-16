// const { finished } = require('stream');
const { logger } = require('../logger/winston');

const handleMiddlewareErrors = async (err, req, res, next) => {
  res.status(500);
  logger.error(`${err}`);
  next();
};

const handleMiddlewareUncaughtException = async err => {
  logger.error(`${err.message}`);
};

const catchErrors = callback => async (req, res, next) => {
  try {
    return callback(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  catchErrors,
  handleMiddlewareErrors,
  handleMiddlewareUncaughtException
};
