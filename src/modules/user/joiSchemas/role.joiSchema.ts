import Joi from 'joi';

export const roleDtoJoiSchema = Joi.object()
  .keys({
    code: Joi.string().required(),
  })
  .meta({ className: 'RoleDto' });
