import Router from '@koa/router';
import jwt from 'koa-jwt';

import { JWT_SECRET } from '../config';
import { apiPrefix } from '../constants/routes';
import { ProtectedAppState } from '../interfaces';
import { setUserMiddleware } from '../middlewares';

export const protectedRouter = new Router<ProtectedAppState>({ prefix: apiPrefix });

protectedRouter.use(jwt({ secret: JWT_SECRET }));
protectedRouter.use(setUserMiddleware);
