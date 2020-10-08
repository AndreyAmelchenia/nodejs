const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const User = require('./user.model');
const usersService = require('./user.service');
// const usersData = require('./users.data.json');

router.param('id', (req, res, next, id) => {
  console.log(id);
  next();
});

router.route('/:id').get(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    const user = await usersService.getId(req.params.id);
    res.json(User.toResponse(user));
  } else {
    res.send(`Id ${req.params.id} User no exists`);
  }
  next();
});

router.route('/:id').put(async (req, res, next) => {
  const exists = await usersService.existsId(req.params.id);
  if (exists) {
    const data = await usersService.putUser(req.params.id, req.body);
    fs.writeFile(
      path.join(__dirname, './users.data.json'),
      JSON.stringify(data),
      error => {
        if (error) {
          console.error('Post error: ', error);
        }
      }
    );
    const userUpdate = await usersService.getId(req.params.id, data);
    res.json(User.toResponse(userUpdate));
  } else {
    res.send(`Id ${req.params.id} no exists`);
  }
  next();
});

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  const exists = await usersService.existsUser(user);
  if (exists) {
    res.send('A user with this name exists!!!');
  } else {
    const data = await usersService.postUser(user);
    fs.writeFile(
      path.join(__dirname, './users.data.json'),
      JSON.stringify(data),
      error => {
        if (error) {
          console.error('Post error: ', error);
        }
      }
    );
    res.json(User.toResponse(user));
  }
});

module.exports = router;
