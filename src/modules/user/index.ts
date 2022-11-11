import Joi from 'joi';

import { routes } from '../../constants/routes';
import { NotFoundError } from '../../interfaces/errors';
import { idValidator } from '../../joiValidators';
import { checkAllowUserEditMiddleware, validateMiddleware } from '../../middlewares';
import { User } from '../../models';
import { protectedRouter } from '../../router';

import { userDtoJoiSchema } from './joiSchemas';
import * as controller from './user.controller';

protectedRouter
  .get(routes.me, controller.me)
  .param(routes.user, async (id, ctx, next) => {
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
  .get(routes.userDetail, controller.show)
  .put(
    routes.userDetail,
    validateMiddleware({ body: userDtoJoiSchema }),
    checkAllowUserEditMiddleware,
    controller.update,
  );
