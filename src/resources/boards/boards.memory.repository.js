const Board = require('./boards.model');

const getAll = async () => Board.find({});

const getId = async id => Board.findOne({ id });

const post = async board => Board.create(board);

const put = async (id, board) => Board.updateOne({ id }, board);

const deleteBoard = async id => Board.deleteOne({ id });

const existsId = async id => Board.findOne({ id });

module.exports = {
  getAll,
  getId,
  post,
  put,
  deleteBoard,
  existsId
};
