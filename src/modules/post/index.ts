import Router from '@koa/router';

import { validateMiddleware } from '../../middlewares';

import * as controller from './post.controller';
import { createPostRequestSchema } from './schemas';

export const postRouter = new Router();

postRouter.post('/register', validateMiddleware(createPostRequestSchema), controller.create);

export const postRoutes = postRouter.routes();
