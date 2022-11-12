import { Middleware } from '@koa/router';

import { PostAppContext, ProtectedAppState } from '../interfaces';
import { ForbiddenError } from '../interfaces/errors';
import { Role } from '../models';
import { getRefId } from '../utils/models';

export const checkPostOwnerMiddleware: Middleware<ProtectedAppState, PostAppContext> = async (ctx, next) => {
  const adminRole = await Role.findOne({
    code: 'admin',
  });

  if (
    !ctx.state.user.data._id.equals(getRefId(ctx.post.user)) &&
    !ctx.state.user.data.roles.some((role) => adminRole._id.equals(getRefId(role)))
  ) {
    throw new ForbiddenError('Only post owner or admin allowed');
  }

  await next();
};
