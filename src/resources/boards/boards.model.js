const uuid = require('uuid');
const mongoose = require('mongoose');

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

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
