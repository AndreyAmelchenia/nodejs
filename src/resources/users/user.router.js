const router = require('express').Router();

const User = require('./user.model');
const tasksService = require('../tasks/tasks.service');
const usersService = require('./user.service');
const { catchErrors } = require('../helper/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.createUser(req.body);
    await usersService.postUser(user);
    res.json(User.toResponse(user));
  })
);

router.route('/:userId').get(
  catchErrors(async (req, res) => {
    const exists = await usersService.existsId(req.params.userId);
    if (exists) {
      const user = await usersService.getId(req.params.userId);
      res.json(User.toResponse(user));
    } else {
      res.json({
        value: `A user with this Id:"${req.params.userId}" no exists!!!`
      });
      // throw new Error();
    }
  })
);

router.route('/:userId').put(
  catchErrors(async (req, res) => {
    const exists = await usersService.existsId(req.params.userId);
    if (exists) {
      await usersService.putUser(req.params.userId, req.body);
      const userUpdate = await usersService.getId(req.params.userId);
      res.json(User.toResponse(userUpdate));
    } else {
      res.json({
        value: `A user with this Id:"${req.params.userId}" no exists!!!`
      });
    }
  })
);

router.route('/:userId').delete(
  catchErrors(async (req, res) => {
    const exists = await usersService.existsId(req.params.userId);
    if (exists) {
      usersService.deleteUser(req.params.userId);
      tasksService.updateTaskByUser(req.params.userId);
      res.json({
        value: `A user with this Id:"${req.params.userId}" no delete!!!`
      });
    } else {
      res.json({
        value: `A user with this Id:"${req.params.userId}" no exists!!!`
      });
    }
  })
);

module.exports = router;
