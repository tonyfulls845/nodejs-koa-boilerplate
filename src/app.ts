import Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';
import mongoose from 'mongoose';

import { MONGO_URI, PORT } from './config';
import { auth } from './modules/auth';

const app = new Koa();

mongoose.connect(MONGO_URI);

app.use(bodyparser());
app.use(mount('/api/auth', auth));

app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: 'http://petstore.swagger.io/v2/swagger.json', // example path to json
    },
  }),
);

app.listen(PORT);
