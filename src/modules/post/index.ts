import Joi from 'joi';

import { NotFoundError } from '../../interfaces/errors';
import { idValidator } from '../../joiValidators';
import { checkPostOwnerMiddleware, validateMiddleware } from '../../middlewares';
import { Post } from '../../models';
import { protectedRouter } from '../../router';

import { createPostRequestJoiSchema } from './joiSchemas';
import * as controller from './post.controller';
import {routes, routesParams} from "../../constants/routes";

protectedRouter
  .post(routes.post, validateMiddleware({ body: createPostRequestJoiSchema }), controller.create)
  .param(routesParams.post, async (id, ctx, next) => {
    await validateMiddleware({
      params: Joi.object({
        post: idValidator,
      }),
    })(ctx);

    ctx.post = await Post.findById(id).populate('user');
    if (!ctx.post) {
      throw new NotFoundError();
    }
    await next();
  })
  .delete(routes.postDetail, checkPostOwnerMiddleware, controller.remove);
