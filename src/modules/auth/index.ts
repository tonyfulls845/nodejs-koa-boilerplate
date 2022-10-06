import Router from '@koa/router';

import { validateMiddleware } from '../../middlewares';

import * as controller from './auth.controller';
import { loginRequestSchema, registerRequestSchema } from './schemas';

export const authRouter = new Router();

authRouter.post('/register', validateMiddleware(registerRequestSchema), controller.register);
authRouter.post('/login', validateMiddleware(loginRequestSchema), controller.login);

export const authRoutes = authRouter.routes();
