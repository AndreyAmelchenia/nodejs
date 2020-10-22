const uuid = require('uuid');
const mongoose = require('mongoose');
// class Column {
//   constructor({ id = uuid(), title = 'string', order = 0 } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//   }
// }
// class Board {
//   constructor({
//     id = uuid(),
//     title = 'string',
//     columns = [
//       {
//         id: uuid(),
//         title: 'string',
//         order: 0
//       }
//     ]
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns.map(e => new Column(e));
//   }
// }

const columnSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number
  },
  { versionKey: false }
);

const boardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [columnSchema]
  },
  { versionKey: false }
);

// boardSchema.statics.toResponse = ({ id, title, columns }) => ({
//   id,
//   title,
//   columns
// });

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
