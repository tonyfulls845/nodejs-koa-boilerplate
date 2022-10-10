import { Middleware } from 'koa';

import { PostAppContext, ProtectedAppState } from '../interfaces';
import { ForbiddenError } from '../interfaces/errors';

export const checkPostOwnerMiddleware: Middleware<ProtectedAppState, PostAppContext> = async (ctx, next) => {
  if (!ctx.state.user.data._id.equals(ctx.post.user)) {
    throw new ForbiddenError('Only post owner allowed');
  }

  await next();
};
