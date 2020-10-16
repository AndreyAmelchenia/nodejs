const fs = require('fs');

const writeObj = async (path, obj) => {
  const write = fs.createWriteStream(path);
  await write.write(JSON.stringify(obj));
};

const deleteObj = async path => {
  // console.log(path);
  await fs.unlink(path, err => {
    if (err) throw err;
  });
};

module.exports = {
  writeObj,
  deleteObj
};
