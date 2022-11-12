import Joi from 'joi';

import { Sex } from '../enums';

import { roleDtoJoiSchema } from './role.joiSchema';

export const userDtoJoiSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    sex: Joi.string().required().valid(Sex.Male, Sex.Female),
    roles: Joi.array().items(roleDtoJoiSchema),
  })
  .meta({ className: 'UserDto' });
