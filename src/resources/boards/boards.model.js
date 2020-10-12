const uuid = require('uuid');

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
}

module.exports = Board;
