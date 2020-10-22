const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const getId = async id => usersRepo.getId(id);

const postUser = async user => usersRepo.post(user);

const putUser = async (id, user) => usersRepo.put(id, user);

const deleteUser = async id => usersRepo.deleteUser(id);

const existsId = async id => usersRepo.existsId(id);

module.exports = {
  getAll,
  getId,
  postUser,
  putUser,
  deleteUser,
  existsId
};
