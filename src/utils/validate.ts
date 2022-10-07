import Joi, { ValidationOptions, ValidationResult } from 'joi';
import { isFunction } from 'lodash';

import { SYMBOLS } from '../constants';

export type Validator = (data: Record<string, unknown>, options?: ValidationOptions) => Promise<ValidationResult>;
export type Validators = Joi.Schema | Validator[] | Validator;

const joiOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: {
    objects: true,
  },
};

const getValidators = (validators = [] as Validators): Validator[] => {
  if ('validate' in validators) {
    return [(data) => validators.validateAsync(data, joiOptions)];
  }

  if (typeof validators === 'function') {
    return [validators];
  }

  if (!Array.isArray(validators) || !validators.every(isFunction)) {
    throw Error('Validators must be type of {Joi Rules Object}, a {Function} or {Array} of functions');
  }

  return validators;
};

export interface ValidateErrorDto {
  field: string;
  message: string;
}

export interface ValidateResultDto {
  errors: ValidateErrorDto[];
  value: Record<string, unknown>;
}

export const validateRules = (payload, validators = [] as Validators): Promise<ValidateResultDto> => {
  const persistentData = payload[SYMBOLS.PERSISTENT];
  return getValidators(validators).reduce(
    async (result, validator) => {
      const data = await result;

      if (data.errors.length) {
        return data;
      }

      try {
        await validator(data.value, persistentData);
        return {
          errors: data.errors,
          value: data.value,
        };
      } catch (error) {
        return {
          errors: [
            ...data.errors,
            ...error.details.map((detail) => {
              return {
                field: detail.context.key,
                message: detail.message,
              };
            }),
          ],
          value: data.value,
        };
      }
    },
    Promise.resolve({
      errors: [],
      value: payload,
    }),
  );
};
