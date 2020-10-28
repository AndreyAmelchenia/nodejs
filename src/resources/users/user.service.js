const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const getId = async id => usersRepo.getId(id);

const getLogin = async login => usersRepo.getLogin(login);

const postUser = async user => usersRepo.post(user);

const putUser = async (id, user) => usersRepo.put(id, user);

const deleteUser = async id => usersRepo.deleteUser(id);

module.exports = {
  getAll,
  getId,
  postUser,
  putUser,
  deleteUser,
  getLogin
};
