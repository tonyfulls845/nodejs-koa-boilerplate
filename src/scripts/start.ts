import open from 'open';

import { APP_URI, NODE_ENV } from '../config';
import { routes } from '../constants/routes';

import { spawnWithConsole } from './helpers';

spawnWithConsole('Gulp watching interfaces', 'gulp');
spawnWithConsole('Watch', 'yarn', ['watch']);
spawnWithConsole('Nodemon watching app', 'nodemon', ['--delay', '500ms']);

if (NODE_ENV === 'development') {
  open(`${APP_URI}/${routes.swagger}`);
}
