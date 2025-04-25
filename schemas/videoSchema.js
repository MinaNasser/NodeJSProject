import Joi from 'joi';

const videoValidationSchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().optional(),
  videoUrl: Joi.string().uri().required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

export default videoValidationSchema;
