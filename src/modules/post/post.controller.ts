import Router from '@koa/router';
import { DefaultState } from 'koa';

import { AppContext } from '../../interfaces';
import { CreatePostRequestModel } from '../schemas.interfaces';

export const create: Router.Middleware<DefaultState, AppContext<CreatePostRequestModel, CreatePostRequestModel>> = (
  ctx,
) => {
  ctx.body = ctx.state.user;
};
