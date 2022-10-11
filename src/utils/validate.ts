import Joi, { ValidationOptions, ValidationResult } from 'joi';
import { isFunction } from 'lodash';

import { SYMBOLS } from '../constants';

export type Validator = (data: Record<string, unknown>, options?: ValidationOptions) => Promise<ValidationResult>;
export type Validators = Joi.Schema | Validator[] | Validator;

export type ValidatorsMap = Partial<Record<ValidatorDestination, Validators>>;

export const validatorsDestinations = ['body', 'query', 'params'] as const;
export type ValidatorDestination = typeof validatorsDestinations[number];

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
  where: string;
  field: string;
  message: string;
}

export interface ValidateResultDto<T = any> {
  errors: ValidateErrorDto[];
  value: {
    body: T;
    params: any;
    query: any;
  };
}

export const validateRules = (payload, validatorsMap = {} as ValidatorsMap): Promise<ValidateResultDto> => {
  const persistentData = payload[SYMBOLS.PERSISTENT];

  return Object.entries(validatorsMap).reduce<Promise<ValidateResultDto>>(
    async (result, [where, validators]) => {
      return getValidators(validators).reduce<Promise<ValidateResultDto>>(async (result, validator) => {
        const data = await result;

        if (data.errors.length) {
          return data;
        }

        try {
          await validator(data.value[where], persistentData);
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
                  where,
                  field: detail.context.key,
                  message: detail.message,
                };
              }),
            ],
            value: data.value,
          };
        }
      }, result);
    },
    Promise.resolve({
      errors: [],
      value: payload,
    }),
  );
};
