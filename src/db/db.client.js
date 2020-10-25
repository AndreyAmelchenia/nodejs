const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');

const connectToDb = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const mongo = mongoose.connection;
  mongo.on('error', console.error.bind(console, 'connection error:'));
  mongo.once('open', () => {
    console.log("we're connected!");
    cb();
  });
};

module.exports = { connectToDb };
