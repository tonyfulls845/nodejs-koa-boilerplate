import { Middleware } from 'koa';

import { ProtectedAppState } from '../interfaces';
import { User } from '../models';

export const setUserMiddleware: Middleware<ProtectedAppState> = async (ctx, next) => {
  ctx.state.user.data = await User.findById(ctx.state.user.data._id).exec();

  await next();
};
