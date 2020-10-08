const getAll = async data => data;

const getId = async (id, data) => data.find(elem => elem.id === id);

const postObj = async (obj, data) => [...data, obj];

const putObj = async (id, obj, data) =>
  data.map(elem => (elem.id === id ? { ...elem, ...obj } : elem));

const deleteObj = async (id, data) => data.filter(elem => elem.id !== id);

const existsObj = async (obj, data) =>
  data.some(elem => elem.name === obj.name);

const existsId = async (id, data) => data.some(elem => elem.id === id);

module.exports = {
  getAll,
  getId,
  postObj,
  putObj,
  deleteObj,
  existsObj,
  existsId
};
