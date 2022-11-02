import Joi from 'joi';

import { NotFoundError } from '../../interfaces/errors';
import { idValidator } from '../../joiValidators';
import { validateMiddleware } from '../../middlewares';
import { User } from '../../models';
import { protectedRouter } from '../../router';

import * as controller from './user.controller';

protectedRouter
  .get('/me', controller.me)
  .param('user', async (id, ctx, next) => {
    await validateMiddleware({
      params: Joi.object({
        post: idValidator,
      }),
    })(ctx);

    ctx.user = await User.findById(id);
    if (!ctx.user) {
      throw new NotFoundError();
    }
    await next();
  })
  .get('/user/:user', controller.show);
