import Router from '@koa/router';

import { AppContext, ProtectedAppState, UserAppContext } from '../../interfaces';
import { UserDto } from '../../jsonSchemas/interfaces';

export const me: Router.Middleware<ProtectedAppState, AppContext<UserDto>> = async (ctx) => {
  ctx.body = ctx.state.user.data;
};

export const show: Router.Middleware<ProtectedAppState, UserAppContext<UserDto>> = async (ctx) => {
  ctx.body = ctx.user;
};

export const update: Router.Middleware<ProtectedAppState, UserAppContext<UserDto, UserDto>> = async (ctx) => {
  const { user } = ctx;
  const {
    value: {
      body: { sex, firstName, lastName },
    },
  } = ctx.validatedRequest;

  user.sex = sex;
  user.firstName = firstName;
  user.lastName = lastName;

  user.save();

  ctx.body = user;
};
