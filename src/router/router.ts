import Router from '@koa/router';

import { apiPrefix } from '../constants/routes';

export const router = new Router({ prefix: apiPrefix });
