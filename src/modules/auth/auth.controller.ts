import Router from '@koa/router';
import * as Koa from 'koa';

import { KoaContext } from '../../interfaces';

import { RegisterRequest } from './interfaces/requests';

export const register: Router.Middleware<Koa.DefaultState, KoaContext<RegisterRequest, RegisterRequest>> = (
  ctx,
  next,
) => {
  ctx.body = ctx.request.body;
};
