const Joi = require("joi");

const videoValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.string().required()
});

module.exports = videoValidationSchema;
