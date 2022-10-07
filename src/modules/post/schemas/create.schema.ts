import Joi from 'joi';

export const createPostRequestSchema = Joi.object()
  .keys({
    message: Joi.string().required(),
  })
  .meta({ className: 'CreatePostRequestModel' });
