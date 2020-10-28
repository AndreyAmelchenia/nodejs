const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { catchErrors } = require('./catchErrors');
const { AuthorizationError } = require('../helper/catchErrors');

const authorizationChecker = catchErrors(async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      await promisify(jwt.verify)(token, JWT_SECRET_KEY);
      return next();
    } catch (err) {
      throw new AuthorizationError(401, 'Unauthorized');
    }
  }
  throw new AuthorizationError(401, 'Unauthorized');
});

module.exports = authorizationChecker;
