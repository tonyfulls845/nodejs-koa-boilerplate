import Joi from 'joi';

export const createPostRequestJoiSchema = Joi.object()
  .keys({
    message: Joi.string().required(),
  })
  .meta({ className: 'CreatePostRequestDto' });
