import Joi from 'joi';

export const loginRequestJoiSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  })
  .meta({ className: 'LoginRequestDto' });
