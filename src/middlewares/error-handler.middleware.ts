import { Middleware } from '@koa/router';
import { DefaultState } from 'koa';

import { AppContext } from '../interfaces';
import { AuthError, Error, HttpError, ValidationError } from '../interfaces/errors';
import { ValidateErrorDto } from '../utils/validate';

export type ErrorDto = {
  message: string;
};

export type ValidationErrorDto = {
  validation: ValidateErrorDto[];
};

export type AnyErrorDto = ValidationErrorDto | ErrorDto;

export type ErrorsResponseDto = {
  errors: AnyErrorDto[];
};

export const errorHandlerMiddleware: Middleware<DefaultState, AppContext<ErrorsResponseDto>> = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.status = error.statusCode;
      ctx.message = error.status;
      ctx.body = {
        errors: [
          {
            validation: error.errors,
          },
        ],
      };
    } else if (error instanceof AuthError) {
      ctx.status = error.statusCode;
      ctx.message = error.status;
    } else if (error instanceof HttpError) {
      ctx.status = error.statusCode;
      ctx.message = error.status;
      ctx.body = error.body;
    } else if (error instanceof Error) {
      ctx.status = 509;
      ctx.body = {
        errors: [error],
      };
    } else {
      ctx.status = 500;
      ctx.message = 'Unknown error';
      ctx.body = {
        errors: [error],
      };
    }
  }
};
