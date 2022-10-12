import Joi from 'joi';

import { Sex } from '../../../jsonSchemas/models';

export const registerRequestJoiSchema = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string().email().required(),
    sex: Joi.string().valid(Sex.Male, Sex.Female).required(),
  })
  .meta({ className: 'RegisterRequestDto' });
