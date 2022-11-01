import { protectedRouter } from '../../router';

import * as controller from './user.controller';

protectedRouter.get('/me', controller.me);
