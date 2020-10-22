const Task = require('./tasks.model');

const getAll = async () => Task.find({});

const getId = async id => Task.findOne({ id });

const post = async board => Task.create(board);

const put = async (id, board) => Task.updateOne({ id }, board);

const deleteTask = async id => Task.deleteOne({ id });

const existsId = async id => Task.findOne({ id });

const updateTasksByIdUser = userId =>
  Task.updateMany({ userId }, { userId: null });

const deleteTasksByIdBoard = boardId => Task.deleteMany({ boardId });

module.exports = {
  getAll,
  getId,
  post,
  put,
  deleteTask,
  existsId,
  updateTasksByIdUser,
  deleteTasksByIdBoard
};
