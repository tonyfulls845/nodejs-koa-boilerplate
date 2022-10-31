import Router from '@koa/router';

import { AppContext, ProtectedAppState } from '../../interfaces';
import { RegisterRequestDto, UserDto } from '../../jsonSchemas/interfaces';

export const me: Router.Middleware<ProtectedAppState, AppContext<UserDto, RegisterRequestDto>> = async (ctx) => {
  ctx.body = ctx.state.user.data;
};
