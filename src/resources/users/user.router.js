const router = require('express').Router();
const User = require('./user.model');
const tasksService = require('../tasks/tasks.service');
const usersService = require('./user.service');

router.route('/:id').get(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    const user = await usersService.getId(req.params.id);
    res.set('Accept', 'application/json');
    res.json(User.toResponse(user));
  } else {
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/:id').put(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    await usersService.putUser(req.params.id, req.body);
    const userUpdate = await usersService.getId(req.params.id);
    res.json(User.toResponse(userUpdate));
  } else {
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/:id').delete(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    res.status(200);
    usersService.deleteUser(req.params.id);
    tasksService.updateTaskByUser(req.params.id);
    res.json({ value: `A user with this Id:"${req.params.id}" no delete!!!` });
  } else {
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.set('Accept', 'application/json');
  res.status(200);
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res, next) => {
  const user = await usersService.createUser(req.body);
  await usersService.postUser(user);
  // console.log(user);
  res.json(User.toResponse(user));
  next();
});
module.exports = router;
