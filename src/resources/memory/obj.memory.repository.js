const getAll = async data => data;

const getId = (id, data) => data.find(elem => elem.id === id);

const postObj = (obj, data) => [...data, obj];

const putObj = (id, obj, data) =>
  data.map(elem => (elem.id === id ? { ...elem, ...obj } : elem));

const deleteObj = (id, data) => data.filter(elem => elem.id !== id);

const deleteObjByIdBoard = (id, data) =>
  data.filter(elem => elem.boardId !== id);

const updateObjByIdUser = (id, data) =>
  data.map(elem => (elem.userId === id ? { ...elem, userId: null } : elem));

const existsId = async (id, data) => {
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
