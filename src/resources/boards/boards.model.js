const uuid = require('uuid');
// const Task = require('../tasks/tasks.model');
class Column {
  constructor({ id = uuid(), title = 'string', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
class Board {
  constructor({
    id = uuid(),
    title = 'string',
    columns = [
      {
        id: uuid(),
        title: 'string',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(e => new Column(e));
  }
  // static toResponse(board) {
  //   const { columns } = board;
  //   return columns;
  // }
}

module.exports = Board;
