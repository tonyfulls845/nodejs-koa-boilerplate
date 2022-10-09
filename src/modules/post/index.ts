import { validateMiddleware } from '../../middlewares';
import { protectedRouter } from '../../router';

import { createPostRequestJoiSchema } from './joiSchemas';
import * as controller from './post.controller';

protectedRouter.post('/post', validateMiddleware(createPostRequestJoiSchema), controller.create);
