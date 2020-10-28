const bcrypt = require('bcrypt');
const { AuthorizationError } = require('../helper/catchErrors');

const comparePassword = async (password, user) => {
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (isMatchPassword) {
    return user;
  }
  throw new AuthorizationError();
};

module.exports = { comparePassword };
