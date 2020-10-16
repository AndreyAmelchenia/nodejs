const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  login: Joi.string()
    .min(3)
    .max(30),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_@]{3,30}$'))
    .required()
});

module.exports = { userSchema };
