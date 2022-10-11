import Joi from 'joi';

export const idValidator = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
