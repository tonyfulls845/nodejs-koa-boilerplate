import Router from '@koa/router';
import * as Koa from 'koa';

import { KoaContext } from '../../interfaces';
import { LoginRequestModel, RegisterRequestModel } from '../schemas.interfaces';

import * as authService from './auth.service';
import { LoginResponseModel, RegisterResponseModel } from './interfaces/responses';

export const register: Router.Middleware<
  Koa.DefaultState,
  KoaContext<RegisterRequestModel, RegisterResponseModel>
> = async (ctx) => {
  ctx.body = await authService.register(ctx.validatedRequest.value);
};

export const login: Router.Middleware<Koa.DefaultState, KoaContext<LoginRequestModel, LoginResponseModel>> = async (
  ctx,
) => {
  ctx.body = await authService.login(ctx.validatedRequest.value);
};
