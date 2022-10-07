import { Middleware } from 'koa';

import { SYMBOLS } from '../constants';
import { ValidationError } from '../interfaces/errors';
import { Validators, validateRules } from '../utils/validate';

const defaultOptions = {
  throwOnInvalid: true,
  statusCode: 422,
};

export const validateMiddleware =
  (validators: Validators, options = defaultOptions): Middleware =>
  async (ctx, next) => {
    const { throwOnInvalid } = {
      ...defaultOptions,
      ...options,
    };

    const payload = {
      ...ctx.request.body,
      ...ctx.query,
      ...ctx.params,
      [SYMBOLS.PERSISTENT]: ctx,
    };

    const result = await validateRules(payload, validators);

    if (throwOnInvalid && result.errors.length) {
      throw new ValidationError(result);
    }

    ctx.validatedRequest = result;

    await next();
  };
