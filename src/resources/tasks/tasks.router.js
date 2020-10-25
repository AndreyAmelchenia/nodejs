const router = require('express').Router({ mergeParams: true });
const { ValidationError } = require('joi');
const tasksService = require('./tasks.service');
const { catchErrors } = require('../../helper/catchErrors');
const { taskSchema } = require('./tasks.schema');
const Task = require('./tasks.model');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const taskValid = await taskSchema.validateAsync({
      ...req.body,
      boardId: req.params.boardId
    });
    const task = await new Task(taskValid);
    await tasksService.postTask(task);
    res.json(task);
  })
);

router.route('/:taskId').get(
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getId(req.params.taskId);
    if (tasks) {
      res.json(tasks);
    } else {
      throw new ValidationError(
        `A task with this Id:"${req.params.taskId}" no exists!!!`
      );
    }
  })
);

router.route('/:taskId').put(
  catchErrors(async (req, res) => {
    const exists = await tasksService.getId(req.params.taskId);
    if (exists) {
      const task = await tasksService.putTask(req.params.taskId, req.body);
      res.json(task);
    } else {
      throw new ValidationError(
        `A task with this Id:"${req.params.taskId}" no exists!!!`
      );
    }
  })
);

router.route('/:taskId').delete(
  catchErrors(async (req, res) => {
    const exists = await tasksService.getId(req.params.taskId);
    if (exists) {
      await tasksService.deleteTask(req.params.taskId);
      res
        .status(204)
        .send(`A task with this Id:"${req.params.taskId}" no delete!!!`);
    } else {
      throw new ValidationError(
        `A task with this Id:"${req.params.taskId}" no exists!!!`
      );
    }
  })
);

module.exports = router;
