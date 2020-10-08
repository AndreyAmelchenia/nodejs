const fs = require('fs');
const path = require('path');
const usersRepo = require('./user.memory.repository');
const data = require('./users.data.json');
const User = require('./user.model');

const getAll = () => usersRepo.getAll(data);

const getId = (id, users = data) => usersRepo.getId(id, users);

const postUser = user => usersRepo.postObj(user, data);

const putUser = (id, user) => usersRepo.putObj(id, user, data);

const deleteUser = id => usersRepo.deleteObj(id, data);

const existsUser = user => usersRepo.existsObj(user, data);

const existsId = id => usersRepo.existsId(id, data);

const createUser = async body => {
  const user = await body;
  return new User({
    login: user.login,
    name: user.name,
    password: user.password
  });
};

const writeUsers = async users => {
  fs.writeFile(
    path.join(__dirname, './users.data.json'),
    JSON.stringify(users),
    error => {
      if (error) {
        console.error('Post error: ', error);
      }
    }
  );
};
module.exports = {
  getAll,
  getId,
  postUser,
  putUser,
  deleteUser,
  existsUser,
  createUser,
  existsId,
  writeUsers
};
