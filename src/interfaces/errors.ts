import { httpStatuses } from '../constants/httpCodes';
import { ErrorsResponseDto } from '../middlewares';
import { ValidateErrorDto } from '../utils/validate';

interface ErrorOptions {
  message: string;
}

export class Error {
  public message: string;

  constructor({ message }: ErrorOptions) {
    this.message = message;
  }
}

interface HttpErrorOptions extends ErrorOptions {
  statusCode: number;
  status?: string;
  body?: ErrorsResponseDto;
}

export class HttpError extends Error {
  public status: string;
  public statusCode: number;
  public body?: ErrorsResponseDto;

  constructor({ statusCode, status = httpStatuses[statusCode], body, ...rest }: HttpErrorOptions) {
    super(rest);

    this.statusCode = statusCode;
    this.status = status;
    this.body = body;
  }
}

interface AuthErrorOptions {
  message?: string;
}

export class AuthError extends HttpError {
  constructor({ message = 'Authentication error' } = {} as AuthErrorOptions) {
    super({ message, statusCode: 401 });
  }
}

interface ValidationErrorOptions {
  errors: ValidateErrorDto[];
}

export class ValidationError extends HttpError {
  public errors: ValidateErrorDto[];
  constructor({ errors }: ValidationErrorOptions) {
    super({ message: 'Validation error', statusCode: 400 });

    this.errors = errors;
  }
}
