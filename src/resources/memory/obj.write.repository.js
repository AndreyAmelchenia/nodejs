const fs = require('fs');

const writeObj = (path, obj) => {
  const write = fs.createWriteStream(path);
  write.end(JSON.stringify(obj));
};

const deleteObj = path => {
  fs.unlink(path, err => {
    if (err) throw err;
  });
};

module.exports = {
  writeObj,
  deleteObj
};
