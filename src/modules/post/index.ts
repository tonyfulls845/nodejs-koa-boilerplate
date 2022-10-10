import { NotFoundError } from '../../interfaces/errors';
import { checkPostOwnerMiddleware, validateMiddleware } from '../../middlewares';
import { Post } from '../../models';
import { protectedRouter } from '../../router';

import { createPostRequestJoiSchema } from './joiSchemas';
import * as controller from './post.controller';

protectedRouter
  .param('post', async (id, ctx, next) => {
    ctx.post = await Post.findById(id);
    if (!ctx.post) {
      throw new NotFoundError();
    }
    await next();
  })
  .post('/post', validateMiddleware(createPostRequestJoiSchema), controller.create)
  .delete('/post/:post', checkPostOwnerMiddleware, controller.remove);
