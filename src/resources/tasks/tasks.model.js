const uuid = require('uuid');
const mongoose = require('mongoose');

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'string',
//     order = 0,
//     description = 'string',
//     userId = 'string',
//     boardId = 'string',
//     columnId = 'string'
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
