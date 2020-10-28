const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../common/config');

const createPassword = async user => {
  const { password } = user;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, +BCRYPT_SALT_ROUNDS);
    return { ...user, password: hashedPassword };
  }
  return user;
};

module.exports = { createPassword };
