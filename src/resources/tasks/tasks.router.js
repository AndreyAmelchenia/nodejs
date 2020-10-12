const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.createTask({
    ...req.body,
    boardId: req.params.boardId
  });
  await tasksService.postTask(task);
  res.json(task);
});

router.route('/:taskId').get(async (req, res) => {
  const exists = await tasksService.existsId(req.params.taskId);
  if (exists) {
    const tasks = await tasksService.getId(req.params.taskId);
    res.json(tasks);
  } else {
    res.status(404);
    res.json({
      value: `A user with this Id:"${req.params.taskId}" no exists!!!`
    });
  }
});

router.route('/:taskId').put(async (req, res) => {
  const exists = await tasksService.existsId(req.params.taskId);
  if (exists) {
    await tasksService.putTask(req.params.taskId, req.body);
    const taskUpdate = await tasksService.getId(req.params.taskId);
    res.json(taskUpdate);
  } else {
    res.status(404);
    res.json({
      value: `A user with this Id:"${req.params.taskId}" no exists!!!`
    });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const exists = await tasksService.existsId(req.params.taskId);
  if (exists) {
    tasksService.deleteTask(req.params.taskId);
    res.json({
      value: `A user with this Id:"${req.params.taskId}" no delete!!!`
    });
  } else {
    res.status(404);
    res.json({
      value: `A user with this Id:"${req.params.taskId}" no exists!!!`
    });
  }
});

module.exports = router;
