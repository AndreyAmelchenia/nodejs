const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').post(async (req, res, next) => {
  const user = await usersService.createUser(req.body);
  const exists = await usersService.existsUser(user);
  if (exists) {
    res.send(`A user with this name:"${req.body.name}" exists!!!`);
  } else {
    const users = await usersService.postUser(user);
    await usersService.writeUsers(users);
    res.json(User.toResponse(user));
  }
  next();
});

router.route('/:id').get(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    const user = await usersService.getId(req.params.id);
    res.json(User.toResponse(user));
  } else {
    res.send(`A user with this Id:"${req.params.id}" no exists!!!`);
  }
  next();
});

router.route('/:id').put(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    const users = await usersService.putUser(req.params.id, req.body);
    await usersService.writeUsers(users);
    const userUpdate = await usersService.getId(req.params.id, users);
    res.json(User.toResponse(userUpdate));
  } else {
    res.send(`A user with this Id:"${req.params.id}" no exists!!!`);
  }
  next();
});

router.route('/:id').delete(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    const users = await usersService.deleteUser(req.params.id);
    await usersService.writeUsers(users);
    res.send(`A user with this Id:"${req.params.id}" delete!!!`);
  } else {
    res.send(`A user with this Id:"${req.params.id}" no exists!!!`);
  }
  next();
});

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

module.exports = router;
