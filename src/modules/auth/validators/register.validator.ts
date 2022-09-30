import Joi from "joi";

export const registerRules = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string().email().required(),
});
