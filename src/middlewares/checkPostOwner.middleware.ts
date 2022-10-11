import { Middleware } from 'koa';

import { PostAppContext, ProtectedAppState } from '../interfaces';
import { ForbiddenError } from '../interfaces/errors';

export const checkPostOwnerMiddleware: Middleware<ProtectedAppState, PostAppContext> = async (ctx, next) => {
  if (!ctx.state.user.data._id.equals(typeof ctx.post.user === 'string' ? ctx.post.user : ctx.post.user._id)) {
    throw new ForbiddenError('Only post owner allowed');
  }

  await next();
};
