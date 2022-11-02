import Router from '@koa/router';

import { AppContext, ProtectedAppState, UserAppContext } from '../../interfaces';
import { UserDto } from '../../jsonSchemas/interfaces';

export const me: Router.Middleware<ProtectedAppState, AppContext<UserDto>> = async (ctx) => {
  ctx.body = ctx.state.user.data;
};

export const show: Router.Middleware<ProtectedAppState, UserAppContext<UserDto>> = async (ctx) => {
  ctx.body = ctx.user;
};
