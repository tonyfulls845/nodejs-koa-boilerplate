import Joi from 'joi';

import { NotFoundError } from '../../interfaces/errors';
import { idValidator } from '../../joiValidators';
import { checkAllowUserEditMiddleware, validateMiddleware } from '../../middlewares';
import { User } from '../../models';
import { protectedRouter } from '../../router';

import { userDtoJoiSchema } from './joiSchemas';
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
  .get('/user/:user', controller.show)
  .put('/user/:user', validateMiddleware({ body: userDtoJoiSchema }), checkAllowUserEditMiddleware, controller.update);
