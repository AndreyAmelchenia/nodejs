const router = require('express').Router();
const Board = require('./boards.model');
const { catchErrors } = require('../helper/catchErrors');
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');
const { boardSchema } = require('./boards.schema');
const { ValidationError } = require('joi');

router.route('/').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getAll();
    res.json(board);
  })
);

router.route('/').post(
  catchErrors(async (req, res, next) => {
    const { error, value } = boardSchema.validate(req.body);
    if (error) return next(error);
    const board = await new Board(value);
    await boardsService.postBoard(board);
    res.json(board);
  })
);

router.route('/:boardId').get(
  catchErrors(async (req, res, next) => {
    const board = await boardsService.getId(req.params.boardId);
    if (board) {
      res.json(board);
    } else {
      return next(
        new ValidationError(
          `A board with this Id:"${req.params.boardId}" no exists!!!`
        )
      );
    }
  })
);

router.route('/:boardId').put(
  catchErrors(async (req, res, next) => {
    const exists = await boardsService.getId(req.params.boardId);
    if (exists) {
      const board = await boardsService.putBoard(req.params.boardId, req.body);
      res.json(board);
    } else {
      return next(
        new ValidationError(
          `A board with this Id:"${req.params.boardId}" no exists!!!`
        )
      );
    }
  })
);

router.route('/:boardId').delete(
  catchErrors(async (req, res, next) => {
    const exists = await boardsService.getId(req.params.boardId);
    if (exists) {
      await boardsService.deleteBoard(req.params.boardId);
      await tasksService.deleteTaskByBoard(req.params.boardId);
      res.status(204);
      res.json({
        value: `A user with this Id:"${req.params.boardId}" no delete!!!`
      });
    } else {
      return next(
        new ValidationError(
          `A board with this Id:"${req.params.boardId}" no exists!!!`
        )
      );
    }
  })
);
module.exports = router;
