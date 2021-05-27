import Joi from 'joi';

const groupSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  permissions: Joi.array().required(),
});

export default groupSchema;
