const User = require('./user.model');

const getAll = async () => User.find({});

const getId = async id => User.findById(id);

const getLogin = async login => User.findOne({ login });

const post = async user => User.create(user);

const put = async (id, user) => User.updateOne({ _id: id }, user);

const deleteUser = async id => User.deleteOne({ _id: id });

const existsId = async id => User.findById(id);

module.exports = {
  getAll,
  getId,
  getLogin,
  post,
  put,
  deleteUser,
  existsId
};
