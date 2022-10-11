import { DefaultContext } from 'koa';
import { ComposedMiddleware } from 'koa-compose';

import { SYMBOLS } from '../constants';
import { ValidationError } from '../interfaces/errors';
import { ValidatorDestination, ValidatorsMap, validateRules } from '../utils/validate';

const defaultOptions = {
  throwOnInvalid: true,
  statusCode: 422,
};

export const validateMiddleware =
  (validatorsMap: ValidatorsMap, options = defaultOptions): ComposedMiddleware<DefaultContext> =>
  async (ctx, next) => {
    const { throwOnInvalid } = {
      ...defaultOptions,
      ...options,
    };

    const payload: Record<ValidatorDestination, unknown> = {
      body: ctx.request.body,
      query: ctx.query,
      params: ctx.params,
      [SYMBOLS.PERSISTENT]: ctx,
    };

    const result = await validateRules(payload, validatorsMap);

    if (throwOnInvalid && result.errors.length) {
      throw new ValidationError(result);
    }

    ctx.validatedRequest = result;

    if (next) {
      await next();
    }
  };
