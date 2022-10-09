import { DefaultContext, DefaultState, Request } from 'koa';

import { UserDocument } from '../models';
import { ValidateResultDto } from '../utils/validate';

export interface AppRequest<RequestBody = any> extends Omit<Request, 'body'> {
  body?: RequestBody;
}

export interface AppContext<ResponseBody = any, RequestBody = any> extends Omit<DefaultContext, 'body'> {
  request: AppRequest<RequestBody>;
  validatedRequest: ValidateResultDto<RequestBody>;
  body: ResponseBody;
}

export type AppState = DefaultState;

export interface ProtectedAppState extends DefaultState {
  user: { data: UserDocument };
}
