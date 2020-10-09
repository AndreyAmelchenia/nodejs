const router = require('express').Router();
const boardsService = require('./boards.service');

router.route('/:id').get(async (req, res, next) => {
  const exists = await boardsService.existsId(req.params.id);
  if (exists) {
    const board = await boardsService.getId(req.params.id);
    res.set('Accept', 'application/json');
    res.json(board);
  } else {
    res.status(404);
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/:id').put(async (req, res, next) => {
  const exists = await boardsService.existsId(req.params.id);
  if (exists) {
    await boardsService.putBoard(req.params.id, req.body);
    const boardUpdate = await boardsService.getId(req.params.id);
    res.json(boardUpdate);
  } else {
    res.status(404);
    res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/:id').delete(async (req, res, next) => {
  const exists = await boardsService.existsId(req.params.id);
  if (exists) {
    boardsService.deleteBoard(req.params.id);
    res.json({ value: `A user with this Id:"${req.params.id}" no delete!!!` });
  } else {
    res.status(404);
    // res.json({ value: `A user with this Id:"${req.params.id}" no exists!!!` });
  }
  next();
});

router.route('/').get(async (req, res) => {
  const board = await boardsService.getAll();
  res.set('Accept', 'application/json');
  res.status(200);
  res.json(board);
});

router.route('/').post(async (req, res, next) => {
  const board = await boardsService.createBoard(req.body);
  await boardsService.postBoard(board);
  res.json(board);
  next();
});

router.route('/:id');
module.exports = router;
