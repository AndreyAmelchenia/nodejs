const router = require('express').Router();
const { catchErrors } = require('../helper/catchErrors');
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');

router.route('/').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getAll();
    res.json(board);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    await boardsService.postBoard(board);
    res.json(board);
  })
);

router.route('/:boardId').get(
  catchErrors(async (req, res) => {
    const exists = await boardsService.existsId(req.params.boardId);
    if (exists) {
      const board = await boardsService.getId(req.params.boardId);
      res.json(board);
    } else {
      res.status(404);
      res.json({
        value: `A user with this Id:"${req.params.boardId}" no exists!!!`
      });
    }
  })
);

router.route('/:boardId').put(
  catchErrors(async (req, res) => {
    const exists = await boardsService.existsId(req.params.boardId);
    if (exists) {
      await boardsService.putBoard(req.params.boardId, req.body);
      const boardUpdate = await boardsService.getId(req.params.boardId);
      res.json(boardUpdate);
    } else {
      res.status(404);
      res.json({
        value: `A user with this Id:"${req.params.boardId}" no exists!!!`
      });
    }
  })
);

router.route('/:boardId').delete(
  catchErrors(async (req, res) => {
    const exists = await boardsService.existsId(req.params.boardId);
    if (exists) {
      boardsService.deleteBoard(req.params.boardId);
      tasksService.deleteTaskByBoard(req.params.boardId);
      res.json({
        value: `A user with this Id:"${req.params.boardId}" no delete!!!`
      });
    } else {
      res.status(404);
      res.json({
        value: `A user with this Id:"${req.params.boardId}" no exists!!!`
      });
    }
  })
);
module.exports = router;
