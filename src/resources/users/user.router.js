const router = require('express').Router();
const User = require('./user.model');
const tasksService = require('../tasks/tasks.service');
const usersService = require('./user.service');
const { catchErrors } = require('../../helper/catchErrors');
const { userSchema } = require('./user.schema');
const { ValidationError } = require('joi');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const userValid = await userSchema.validateAsync({
      ...req.body
    });
    const user = await new User(userValid);
    await usersService.postUser(user);
    res.json(User.toResponse(user));
  })
);

router.route('/:userId').get(
  catchErrors(async (req, res) => {
    const user = await usersService.getId(req.params.userId);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      throw new ValidationError(
        `A user with this Id:"${req.params.userId}" no exists!!!`
      );
    }
  })
);

router.route('/:userId').put(
  catchErrors(async (req, res) => {
    const exists = await usersService.getId(req.params.userId);
    if (exists) {
      const user = await usersService.putUser(req.params.userId, req.body);
      res.json(User.toResponse(user));
    } else {
      throw new ValidationError(
        `A user with this Id:"${req.params.userId}" no exists!!!`
      );
    }
  })
);

router.route('/:userId').delete(
  catchErrors(async (req, res) => {
    const exists = await usersService.getId(req.params.userId);
    if (exists) {
      await usersService.deleteUser(req.params.userId);
      await tasksService.updateTaskByUser(req.params.userId);
      res
        .status(204)
        .send(`A user with this Id:"${req.params.userId}" no delete!!!`);
    } else {
      throw new ValidationError(
        `A user with this Id:"${req.params.userId}" no exists!!!`
      );
    }
  })
);

module.exports = router;
