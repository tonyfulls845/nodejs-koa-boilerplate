import { httpStatuses } from '../constants/httpCodes';
import { ErrorsResponseDto } from '../middlewares';
import { ValidateErrorDto } from '../utils/validate';

interface ErrorOptions {
  message: string;
}

export class BaseError {
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

export class HttpError extends BaseError {
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

export class AuthError extends HttpError {
  constructor(message = 'Authentication error') {
    super({ message, statusCode: 401 });
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not found error') {
    super({ message, statusCode: 404 });
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super({ message, statusCode: 403 });
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
