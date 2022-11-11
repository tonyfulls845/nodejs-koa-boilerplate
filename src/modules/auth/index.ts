import { routes } from '../../constants/routes';
import { validateMiddleware } from '../../middlewares';
import { router } from '../../router';

import * as controller from './auth.controller';
import { loginRequestJoiSchema, registerRequestJoiSchema } from './joiSchemas';

router.post(routes.register, validateMiddleware({ body: registerRequestJoiSchema }), controller.register);
router.post(routes.login, validateMiddleware({ body: loginRequestJoiSchema }), controller.login);
