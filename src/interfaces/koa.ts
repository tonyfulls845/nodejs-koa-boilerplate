import { Context, Request } from 'koa';

export interface KoaRequest<RequestBody = any> extends Omit<Request, 'body'> {
  body?: RequestBody;
}

export interface KoaContext<RequestBody = any, ResponseBody = any> extends Omit<Context, 'body'> {
  request: KoaRequest<RequestBody>;
  body: ResponseBody;
}
