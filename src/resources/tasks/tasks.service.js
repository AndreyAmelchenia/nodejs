const tasksRepo = require('./tasks.memory.repository');

const getAll = async () => tasksRepo.getAll();

const postTask = async task => tasksRepo.post(task);

const getId = async id => tasksRepo.getId(id);

const putTask = async (id, task) => tasksRepo.put(id, task);

const deleteTask = async id => tasksRepo.deleteTask(id);

const updateTaskByUser = async userId => tasksRepo.updateTasksByIdUser(userId);

const deleteTaskByBoard = async BoardId =>
  tasksRepo.deleteTasksByIdBoard(BoardId);

module.exports = {
  getAll,
  postTask,
  getId,
  putTask,
  deleteTask,
  updateTaskByUser,
  deleteTaskByBoard
};
