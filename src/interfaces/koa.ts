import { DefaultContext, DefaultState, Request } from 'koa';

export interface AppRequest<RequestBody = any> extends Omit<Request, 'body'> {
  body?: RequestBody;
}

export interface AppContext<RequestBody = any, ResponseBody = any> extends Omit<DefaultContext, 'body'> {
  request: AppRequest<RequestBody>;
  body: ResponseBody;
}
