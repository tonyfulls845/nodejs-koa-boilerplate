import Router from '@koa/router';

import { validateMiddleware } from '../../middlewares';

import * as controller from './auth.controller';
import { registerRequestSchema } from './schemas';

export const authRouter = new Router();

authRouter.post('/register', validateMiddleware(registerRequestSchema), controller.register);

export const authRoutes = authRouter.routes();
