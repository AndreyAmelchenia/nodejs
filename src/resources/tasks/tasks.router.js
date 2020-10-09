const router = require('express').Router();
const tasksService = require('./tasks.service');

router.route('/:id').get(async (req, res, next) => {
  const exists = await tasksService.existsId(req.params.id);
  if (exists) {
    const tasks = await tasksService.getId(req.params.id);
    res.set('Accept', 'application/json');
    res.status(200);
    res.json(tasks);
  } else {
    res.status(404);
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/:id').put(async (req, res, next) => {
  console.log();
  const exists = await tasksService.existsId(req.params.id);
  if (exists) {
    await tasksService.putTask(req.params.id, req.body);
    const taskUpdate = await tasksService.getId(req.params.id);
    res.json(taskUpdate);
  } else {
    res.status(404);
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/:id').delete(async (req, res, next) => {
  const exists = await tasksService.existsId(req.params.id);
  if (exists) {
    tasksService.deleteTask(req.params.id);
    res.json({ value: `A user with this Id:"${req.params.id}" no delete!!!` });
  } else {
    res.status(404);
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

module.exports = router;
