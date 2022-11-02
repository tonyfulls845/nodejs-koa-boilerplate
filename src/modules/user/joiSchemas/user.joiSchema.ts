import Joi from 'joi';

import { Sex } from '../enums';

export const userDtoJoiSchema = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    sex: Joi.string().required().valid(Sex.Male, Sex.Female),
  })
  .meta({ className: 'UserDto' });
