import Joi from 'joi';

const groupSchema = Joi.object({
  id: Joi.string(),
  groupId: Joi.string().required(),
  userId: Joi.string().required(),
});

export default groupSchema;
