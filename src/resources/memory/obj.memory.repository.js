const path = require('path');
const base = require('./obj.write.repository');

const getAll = data => data;

const getId = (id, data) => data.find(elem => elem.id === id);

const postObj = (pathName, obj, data) => {
  base.writeObj(path.join(__dirname, `./${pathName}/${obj.id}.json`), obj);
  data.push(obj);
  return data;
};

const putObj = (pathName, id, obj, data) => {
  base.writeObj(path.join(__dirname, `./${pathName}/${id}.json`), {
    ...data.find(elem => elem.id === id),
    ...obj
  });
  return data.map(elem => (elem.id === id ? { ...elem, ...obj } : elem));
};

const deleteObj = (pathName, id, data) => {
  base.deleteObj(path.join(__dirname, `./${pathName}/${id}.json`));
  return data.filter(elem => elem.id !== id);
};

const deleteObjByIdBoard = (pathName, id, data) => {
  data.forEach(elem => {
    if (elem.boardId === id) {
      base.deleteObj(path.join(__dirname, `./${pathName}/${elem.id}.json`));
    }
  });
  return data.filter(elem => elem.boardId !== id);
};

const updateObjByIdUser = (pathName, id, data) => {
  data.forEach(elem => {
    if (elem.userId === id) {
      base.writeObj(path.join(__dirname, `./${pathName}/${elem.id}.json`), {
        ...data.find(element => element.id === elem.id),
        userId: null
      });
    }
  });
  return data.map(elem =>
    elem.userId === id ? { ...elem, userId: null } : elem
  );
};

const existsId = (id, data) => {
  return data.some(elem => elem.id === id);
};

module.exports = {
  getAll,
  getId,
  postObj,
  putObj,
  deleteObj,
  existsId,
  deleteObjByIdBoard,
  updateObjByIdUser
};
