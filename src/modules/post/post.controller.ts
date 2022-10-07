import Router from '@koa/router';
import { DefaultState } from 'koa';

import { AppContext } from '../../interfaces';
import { CreatePostRequestDto } from '../schemas.interfaces';

export const create: Router.Middleware<DefaultState, AppContext<CreatePostRequestDto, CreatePostRequestDto>> = (
  ctx,
) => {
  ctx.body = ctx.state.user;
};
