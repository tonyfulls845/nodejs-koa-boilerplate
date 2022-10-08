import Router from '@koa/router';
import { DefaultState } from 'koa';

import { AppContext } from '../../interfaces';
import { LoginRequestDto, RegisterRequestModel } from '../schemas.interfaces';

import * as authService from './auth.service';
import { LoginResponseDto, RegisterResponseDto } from './interfaces/responses';

export const register: Router.Middleware<DefaultState, AppContext<RegisterResponseDto, RegisterRequestModel>> = async (
  ctx,
) => {
  ctx.body = await authService.register(ctx.validatedRequest.value);
};

export const login: Router.Middleware<DefaultState, AppContext<LoginResponseDto, LoginRequestDto>> = async (ctx) => {
  ctx.body = await authService.login(ctx.validatedRequest.value);
};
