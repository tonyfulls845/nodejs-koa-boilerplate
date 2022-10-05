import Router from '@koa/router';
import * as Koa from 'koa';

import { KoaContext } from '../../interfaces';
import { RegisterRequestModel } from '../schemas.joi';

export const register: Router.Middleware<Koa.DefaultState, KoaContext<RegisterRequestModel, RegisterRequestModel>> = (
  ctx,
  next,
) => {
  ctx.body = ctx.request.body;
};
