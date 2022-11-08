import Router from '@koa/router';
import { DefaultState } from 'koa';

import { AppContext } from '../../interfaces';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, UserDto } from '../../jsonSchemas/interfaces';

import * as authService from './auth.service';

export const register: Router.Middleware<DefaultState, AppContext<UserDto, RegisterRequestDto>> = async (ctx) => {
  ctx.body = await authService.register(ctx.validatedRequest.value.body);

  ctx.status = 201;
};

export const login: Router.Middleware<DefaultState, AppContext<LoginResponseDto, LoginRequestDto>> = async (ctx) => {
  ctx.body = await authService.login(ctx.validatedRequest.value.body);
};
