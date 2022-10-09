import Joi from 'joi';

export const registerRequestJoiSchema = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string().email().required(),
  })
  .meta({ className: 'RegisterRequestDto' });
