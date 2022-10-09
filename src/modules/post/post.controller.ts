import Router from '@koa/router';

import { AppContext, ProtectedAppState } from '../../interfaces';
import { CreatePostRequestDto, PostDto } from '../../jsonSchemas/interfaces';

import * as postService from './post.service';

export const create: Router.Middleware<ProtectedAppState, AppContext<PostDto, CreatePostRequestDto>> = async (ctx) => {
  ctx.body = await postService.create(ctx.validatedRequest.value, ctx.state.user.data);
};
