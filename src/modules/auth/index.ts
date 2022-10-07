import { validateMiddleware } from '../../middlewares';
import { router } from '../../router';

import * as controller from './auth.controller';
import { loginRequestSchema, registerRequestSchema } from './schemas';

router.post('/register', validateMiddleware(registerRequestSchema), controller.register);
router.post('/login', validateMiddleware(loginRequestSchema), controller.login);
