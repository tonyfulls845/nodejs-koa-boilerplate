import { validateMiddleware } from '../../middlewares';
import { protectedRouter } from '../../router';

import * as controller from './post.controller';
import { createPostRequestSchema } from './schemas';

protectedRouter.post('/post', validateMiddleware(createPostRequestSchema), controller.create);
