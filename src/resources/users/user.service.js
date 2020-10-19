const usersRepo = require('../memory/obj.memory.repository');

const User = require('./user.model');

let data = [];

const getAll = async () => usersRepo.getAll(data);

const getId = async id => usersRepo.getId(id, data);

const postUser = async user => {
  data = usersRepo.postObj('usersData', user, data);
};

const putUser = async (id, user) =>
  (data = usersRepo.putObj('usersData', id, user, data));

const deleteUser = async id =>
  (data = usersRepo.deleteObj('usersData', id, data));

const existsId = async id => usersRepo.existsId(id, data);

const createUser = async body => {
  const user = await body;
  return new User({
    login: user.login,
    name: user.name,
    password: user.password
  });
};

module.exports = {
  getAll,
  getId,
  postUser,
  putUser,
  deleteUser,
  createUser,
  existsId
};
