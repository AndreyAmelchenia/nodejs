const { ValidationError } = require('joi');
const { loggerError, loggerInfo } = require('../logger/winston');

const handleMiddlewareErrors = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(404).json(err.message);
    loggerInfo.error(`statusCode: 404, ${err}`);
    return;
  }
  res.status(500).json(err.message);
  loggerInfo.error(`statusCode: 500, ${err}`);
  next();
};

const handleMiddlewareUncaught = async err => {
  loggerError.error(err.message);
};

const catchErrors = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  catchErrors,
  handleMiddlewareErrors,
  handleMiddlewareUncaught
};
