import Router from '@koa/router';
import * as Koa from 'koa';

import { KoaContext } from '../../interfaces';
import { RegisterRequestModel } from '../schemas.interfaces';

import * as authService from './auth.service';
import { RegisterResponseModel } from './interfaces/responses';

export const register: Router.Middleware<
  Koa.DefaultState,
  KoaContext<RegisterRequestModel, RegisterResponseModel>
> = async (ctx) => {
  const user = await authService.register(ctx.validatedRequest.value);
  ctx.body = user;
};
