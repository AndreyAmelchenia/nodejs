const Joi = require('joi');

const boardSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),

  columns: Joi.array().items(
    Joi.object({
      title: Joi.string()
        .min(3)
        .max(30),
      order: Joi.number()
    })
  )
});

module.exports = { boardSchema };
