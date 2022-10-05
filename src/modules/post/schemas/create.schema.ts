import Joi from 'joi';

export const createPostRequestSchema = Joi.object()
  .keys({
    message: Joi.string().email().required(),
  })
  .meta({ className: 'CreatePostRequestModel' });
