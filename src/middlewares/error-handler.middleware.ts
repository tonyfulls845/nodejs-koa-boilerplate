import { Middleware } from '@koa/router';
import { DefaultState } from 'koa';

import { AppContext } from '../interfaces';
import { AuthError, Error, ForbiddenError, HttpError, NotFoundError, ValidationError } from '../interfaces/errors';
import { ValidateErrorDto } from '../utils/validate';

export type ErrorDto = {
  message: string;
  error?: unknown;
};

export type ValidationErrorDto = {
  validation: ValidateErrorDto[];
};

export type AnyErrorDto = ValidationErrorDto | ErrorDto;

export type ErrorsResponseDto = {
  errors: AnyErrorDto[];
};

export const convertKoaThrowMiddleware: Middleware<DefaultState, AppContext<ErrorsResponseDto>> = async (ctx, next) => {
  try {
    await next();

    if (ctx.response.status === 404) {
      throw ctx.response;
    }
  } catch (error) {
    if (error.status === 401) {
      throw new AuthError();
    } else if (error.status === 404) {
      throw new NotFoundError();
    }

    throw error;
  }
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
    } else if (error instanceof AuthError || error instanceof NotFoundError || error instanceof ForbiddenError) {
      ctx.status = error.statusCode;
      ctx.message = error.status;
      ctx.body = {
        errors: [{ message: error.message }],
      };
    } else if (error instanceof HttpError) {
      ctx.status = error.statusCode;
      ctx.message = error.status;
      ctx.body = error.body;
    } else if (error instanceof Error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
      ctx.body = {
        errors: [{ message: error.message }],
      };
    } else {
      ctx.status = 500;
      ctx.message = 'Internal server error';
      ctx.body = {
        errors: [{ message: 'Unknown error', error }],
      };
    }
  }
};
