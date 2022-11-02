import { Middleware } from '@koa/router';

import { ProtectedAppState, UserAppContext } from '../interfaces';
import { ForbiddenError } from '../interfaces/errors';

export const checkAllowUserEditMiddleware: Middleware<ProtectedAppState, UserAppContext> = async (ctx, next) => {
  if (!ctx.state.user.data._id.equals(typeof ctx.user === 'string' ? ctx.user : ctx.user._id)) {
    throw new ForbiddenError('Only authenticated user allowed to edit');
  }

  await next();
};
