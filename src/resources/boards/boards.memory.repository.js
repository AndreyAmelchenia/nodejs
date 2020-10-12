const getAll = async data => data;

const getAllTasksById = async (id, data) => data;

const getId = (id, data) => data.find(elem => elem.id === id);

const postObj = (obj, data) => [...data, obj];

const putObj = (id, obj, data) =>
  data.map(elem => (elem.id === id ? { ...elem, ...obj } : elem));

const deleteObj = (id, data) => data.filter(elem => elem.id !== id);

const existsObj = async (obj, data) =>
  data.some(elem => elem.name === obj.name);

const existsId = async (id, data) => {
  return data.some(elem => elem.id === id);
};

const postTask = (id, obj, data) =>
  data.map(elem =>
    elem.id === id ? { ...elem, columns: [...elem.columns, obj] } : elem
  );

module.exports = {
  getAll,
  getId,
  postObj,
  putObj,
  deleteObj,
  existsObj,
  existsId,
  getAllTasksById,
  postTask
};
