import Router from '@koa/router';
import * as Koa from 'koa';

import { KoaContext } from '../../interfaces';
import { CreatePostRequestModel } from '../schemas.interfaces';

export const create: Router.Middleware<Koa.DefaultState, KoaContext<CreatePostRequestModel, CreatePostRequestModel>> = (
  ctx,
  next,
) => {
  ctx.body = ctx.request.body;
};
