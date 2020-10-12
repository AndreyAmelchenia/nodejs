const tasksRepo = require('../memory/obj.memory.repository');

const Task = require('./tasks.model');

let data = [];

const getAll = () => tasksRepo.getAll(data);

const postTask = task => data.push(task);

const getId = id => tasksRepo.getId(id, data);

const putTask = (id, task) => {
  data = tasksRepo.putObj(id, task, data);
};

const deleteTask = id => (data = tasksRepo.deleteObj(id, data));

const updateTaskByUser = id => {
  data = tasksRepo.updateObjByIdUser(id, data);
};

const deleteTaskByBoard = id => (data = tasksRepo.deleteObjByIdBoard(id, data));

const existsId = id => tasksRepo.existsId(id, data);

const createTask = body => {
  const task = body;
  return new Task({
    title: task.title,
    columns: task.columns,
    order: task.order,
    description: task.description,
    userId: task.userId,
    boardId: task.boardId,
    columnId: task.columnId
  });
};

module.exports = {
  createTask,
  getAll,
  postTask,
  getId,
  putTask,
  existsId,
  deleteTask,
  updateTaskByUser,
  deleteTaskByBoard
};
