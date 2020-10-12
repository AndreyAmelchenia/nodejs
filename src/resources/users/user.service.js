const usersRepo = require('./user.memory.repository');

const User = require('./user.model');

let data = [];

const getAll = () => usersRepo.getAll(data);

const getId = id => usersRepo.getId(id, data);

const postUser = user => data.push(user);

const putUser = (id, user) => {
  data = usersRepo.putObj(id, user, data);
};

const deleteUser = id => (data = usersRepo.deleteObj(id, data));

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

module.exports = {
  getAll,
  getId,
  postUser,
  putUser,
  deleteUser,
  existsUser,
  createUser,
  existsId
};
