import Router from '@koa/router';

import { apiPrefix } from '../constants/routes';
import { AppState } from '../interfaces';

export const router = new Router<AppState>({ prefix: apiPrefix });
