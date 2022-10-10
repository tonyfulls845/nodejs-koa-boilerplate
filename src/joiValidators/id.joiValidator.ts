import Joi from 'joi';

export const idJoiValidator = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
