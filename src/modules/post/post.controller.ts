import Router from '@koa/router';

import { AppContext, ProtectedAppState } from '../../interfaces';
import { AppJWTPayload } from '../../interfaces/auth';
import { CreatePostRequestDto, PostDto } from '../../jsonSchemas/interfaces';
import { Post } from '../../models';

export const create: Router.Middleware<ProtectedAppState, AppContext<AppJWTPayload, CreatePostRequestDto>> = async (
  ctx,
) => {
  const data = ctx.request.body;

  const post = new Post<PostDto>({ ...data, user: ctx.state.user.data._id });
  await post.save();

  ctx.body = post.toObject();
};
