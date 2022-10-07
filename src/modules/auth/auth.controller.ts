import Router from '@koa/router';
import { DefaultState } from 'koa';

import { AppContext } from '../../interfaces';
import { LoginRequestModel, RegisterRequestModel } from '../schemas.interfaces';

import * as authService from './auth.service';
import { LoginResponseModel, RegisterResponseModel } from './interfaces/responses';

export const register: Router.Middleware<
  DefaultState,
  AppContext<RegisterRequestModel, RegisterResponseModel>
> = async (ctx) => {
  ctx.body = await authService.register(ctx.validatedRequest.value);
};

export const login: Router.Middleware<DefaultState, AppContext<LoginRequestModel, LoginResponseModel>> = async (
  ctx,
) => {
  ctx.body = await authService.login(ctx.validatedRequest.value);
};
