const getAll = data => data;

const getId = (id, data) => data.find(elem => elem.id === id);

const postObj = (pathName, obj, data) => {
  data.push(obj);
  return data;
};

const putObj = (pathName, id, obj, data) => {
  return data.map(elem => (elem.id === id ? { ...elem, ...obj } : elem));
};

const deleteObj = (pathName, id, data) => {
  return data.filter(elem => elem.id !== id);
};

const deleteObjByIdBoard = (pathName, id, data) => {
  return data.filter(elem => elem.boardId !== id);
};

const updateObjByIdUser = (pathName, id, data) => {
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
