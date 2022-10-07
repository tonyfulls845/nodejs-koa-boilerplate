import Router from '@koa/router';
import jwt from 'koa-jwt';

import { JWT_SECRET } from '../config';
import { apiPrefix } from '../constants/routes';

export const protectedRouter = new Router({ prefix: apiPrefix });

protectedRouter.use(jwt({ secret: JWT_SECRET }));
