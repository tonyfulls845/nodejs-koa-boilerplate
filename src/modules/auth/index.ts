import { validateMiddleware } from '../../middlewares';
import { router } from '../../router';

import * as controller from './auth.controller';
import { loginRequestJoiSchema, registerRequestJoiSchema } from './joiSchemas';

router.post('/register', validateMiddleware(registerRequestJoiSchema), controller.register);
router.post('/login', validateMiddleware(loginRequestJoiSchema), controller.login);
