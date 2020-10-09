const boardsRepo = require('./boards.memory.repository');

const Board = require('./boards.model');

let data = [];

const getAll = () => boardsRepo.getAll(data);

const getId = id => boardsRepo.getId(id, data);

const postBoard = board => data.push(board);

const putBoard = (id, board) => {
  data = boardsRepo.putObj(id, board, data);
};

const deleteBoard = id => (data = boardsRepo.deleteObj(id, data));

const existsBoard = user => boardsRepo.existsObj(user, data);

const existsId = id => boardsRepo.existsId(id, data);

const createBoard = async body => {
  const board = await body;
  return new Board({
    title: board.title,
    columns: board.columns
  });
};

module.exports = {
  getAll,
  getId,
  postBoard,
  putBoard,
  deleteBoard,
  existsBoard,
  createBoard,
  existsId
};
