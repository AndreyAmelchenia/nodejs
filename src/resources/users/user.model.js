const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  },
  { versionKey: false }
);

userSchema.statics.toResponse = ({ _id, name, login }) => ({
  id: _id,
  name,
  login
});

const User = mongoose.model('User', userSchema);

module.exports = User;
