import { DefaultContext, Request } from 'koa';

export interface AppRequest<RequestBody = any> extends Omit<Request, 'body'> {
  body?: RequestBody;
}

export interface AppContext<ResponseBody = any, RequestBody = any> extends Omit<DefaultContext, 'body'> {
  request: AppRequest<RequestBody>;
  body: ResponseBody;
}
