import Router from '@koa/router';

import { AppContext, PostAppContext, ProtectedAppState } from '../../interfaces';
import { NestedModelWithId } from '../../interfaces/generics';
import { CreatePostRequestDto, PostDto } from '../../jsonSchemas/interfaces';

import * as postService from './post.service';

export const create: Router.Middleware<
  ProtectedAppState,
  AppContext<NestedModelWithId<PostDto>, CreatePostRequestDto>
> = async (ctx) => {
  ctx.body = await postService.create(ctx.validatedRequest.value, ctx.state.user.data);
};

export const remove: Router.Middleware<ProtectedAppState, PostAppContext<PostDto, CreatePostRequestDto>> = async (
  ctx,
) => {
  await ctx.post.delete();
  ctx.status = 200;
};
