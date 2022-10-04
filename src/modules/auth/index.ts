import Router from '@koa/router';

import { validateMiddleware } from '../../middlewares';

import * as controller from './auth.controller';
import { registerRequestSchema } from './schema';

export * as authSchema from './schema';

export const authRouter = new Router();

authRouter.post('/register', validateMiddleware(registerRequestSchema), controller.register);

export const auth = authRouter.routes();
