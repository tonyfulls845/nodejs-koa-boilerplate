import { Middleware } from 'koa';

import { SYMBOLS } from '../constants';
import { Validators, validateRules } from '../utils/validate';

const defaultOptions = {
  throwOnInvalid: true,
  statusCode: 422,
};

export const validateMiddleware =
  (validators: Validators, options = defaultOptions): Middleware =>
  async (ctx, next) => {
    const { throwOnInvalid, statusCode } = {
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
      ctx.status = statusCode || 400;
      ctx.body = {
        errors: result.errors,
      };

      return;
    }

    ctx.validatedRequest = result;

    await next();
  };
