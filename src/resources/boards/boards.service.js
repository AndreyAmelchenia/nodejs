const boardsRepo = require('./boards.memory.repository');

const getAll = async () => boardsRepo.getAll();

const getId = async id => boardsRepo.getId(id);

const postBoard = async board => boardsRepo.post(board);

const putBoard = async (id, board) => boardsRepo.put(id, board);

const deleteBoard = async id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getId,
  postBoard,
  putBoard,
  deleteBoard
};
