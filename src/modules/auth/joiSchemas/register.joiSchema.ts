import Joi from 'joi';

import { userDtoJoiSchema } from '../../user/joiSchemas';

export const registerRequestJoiSchema = userDtoJoiSchema
  .keys({
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string().email().required(),
  })
  .meta({ className: 'RegisterRequestDto' });
