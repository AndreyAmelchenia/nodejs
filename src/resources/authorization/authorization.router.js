const router = require('express').Router();
const { AuthorizationError } = require('../../helper/catchErrors');
const authorizationService = require('./authorization.service');
const userService = require('../users/user.service');
const { catchErrors } = require('../../helper/catchErrors');
const { comparePassword } = require('../../utils/compare.password');

router.route('/').post(
  catchErrors(async (req, res) => {
    const { login, password } = req.body;
    const user = await userService.getLogin(login);
    if (user) {
      const userComparePassword = await comparePassword(password, user);
      const token = await authorizationService.getToken(userComparePassword);
      res.json({ token });
    } else {
      throw new AuthorizationError();
    }
  })
);

module.exports = router;
