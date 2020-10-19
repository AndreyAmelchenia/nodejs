const boardsRepo = require('../memory/obj.memory.repository');

const Board = require('./boards.model');

let data = [];

const getAll = () => boardsRepo.getAll(data);

const getId = id => boardsRepo.getId(id, data);

const postBoard = board =>
  (data = boardsRepo.postObj('boardsData', board, data));

const putBoard = (id, board) =>
  (data = boardsRepo.putObj('boardsData', id, board, data));

const deleteBoard = id => (data = boardsRepo.deleteObj('boardsData', id, data));

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
  createBoard,
  existsId
};
