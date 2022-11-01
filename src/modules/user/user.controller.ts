import Router from '@koa/router';

import { AppContext, ProtectedAppState } from '../../interfaces';
import { UserDto } from '../../jsonSchemas/interfaces';

export const me: Router.Middleware<ProtectedAppState, AppContext<UserDto>> = async (ctx) => {
  ctx.body = ctx.state.user.data;
};
