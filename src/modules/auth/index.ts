import Router from '@koa/router';

import { validateMiddleware } from '../../middlewares';

import * as controller from './auth.controller';
import { registerRules } from './validators';

export const authRouter = new Router();

authRouter.post('/register', validateMiddleware(registerRules), controller.register);

export const auth = authRouter.routes();
