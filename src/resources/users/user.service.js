const requireDir = require('require-dir');
const usersRepo = require('../memory/obj.memory.repository');

const User = require('./user.model');

const newData = requireDir('../memory/usersData');

let data = Object.values(newData);

const getAll = () => usersRepo.getAll(data);

const getId = id => usersRepo.getId(id, data);

const postUser = user => {
  data = usersRepo.postObj('usersData', user, data);
};

const putUser = (id, user) =>
  (data = usersRepo.putObj('usersData', id, user, data));

const deleteUser = id => (data = usersRepo.deleteObj('usersData', id, data));

const existsId = id => usersRepo.existsId(id, data);

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
