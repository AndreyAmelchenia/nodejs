const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const getToken = user => {
  const { _id, login } = user;
  const token = jwt.sign({ _id, login }, JWT_SECRET_KEY, {
    expiresIn: '2h'
  });
  return token;
};

module.exports = { getToken };
