const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),

  order: Joi.number(),

  description: Joi.string(),

  userId: Joi.string().allow(null),

  boardId: Joi.string().required(),

  columnId: Joi.string().allow(null)
});

module.exports = { taskSchema };
