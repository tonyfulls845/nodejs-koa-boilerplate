import Router from '@koa/router';

import { AppContext, ProtectedAppState } from '../../interfaces';
import { AppJWTPayload } from '../../interfaces/auth';
import { CreatePostRequestDto } from '../schemas.interfaces';

export const create: Router.Middleware<ProtectedAppState, AppContext<AppJWTPayload, CreatePostRequestDto>> = (ctx) => {
  const data = ctx.state.user.data.toJSON();

  ctx.body = {
    data: ctx.state.user.data.toJSON(),
  };
};
