const router = require('express').Router();
const User = require('./user.model');
const tasksService = require('../tasks/tasks.service');
const usersService = require('./user.service');
const { catchErrors } = require('../helper/catchErrors');
const { userSchema } = require('./user.schema');
const { ValidationError } = require('joi');

router.route('/').get(
  catchErrors(async (req, res, next) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
    next();
  })
);

router.route('/').post(
  catchErrors(async (req, res, next) => {
    const { error, value } = userSchema.validate({
      ...req.body
    });
    if (error) return next(error);
    const user = await new User(value);
    await usersService.postUser(user);
    res.json(User.toResponse(user));
  })
);

router.route('/:userId').get(
  catchErrors(async (req, res, next) => {
    const exists = await usersService.existsId(req.params.userId);
    if (exists) {
      const user = await usersService.getId(req.params.userId);
      res.json(User.toResponse(user));
    } else {
      return next(
        new ValidationError(
          `A user with this Id:"${req.params.userId}" no exists!!!`
        )
      );
    }
  })
);

router.route('/:userId').put(
  catchErrors(async (req, res, next) => {
    const exists = await usersService.existsId(req.params.userId);
    if (exists) {
      await usersService.putUser(req.params.userId, req.body);
      const userUpdate = await usersService.getId(req.params.userId);
      res.json(User.toResponse(userUpdate));
    } else {
      return next(
        new ValidationError(
          `A user with this Id:"${req.params.userId}" no exists!!!`
        )
      );
    }
  })
);

router.route('/:userId').delete(
  catchErrors(async (req, res, next) => {
    const exists = await usersService.existsId(req.params.userId);
    if (exists) {
      await usersService.deleteUser(req.params.userId);
      await tasksService.updateTaskByUser(req.params.userId);
      res.status(204);
      res.json({
        value: `A user with this Id:"${req.params.userId}" no delete!!!`
      });
    } else {
      return next(
        new ValidationError(
          `A user with this Id:"${req.params.userId}" no exists!!!`
        )
      );
    }
  })
);

module.exports = router;
