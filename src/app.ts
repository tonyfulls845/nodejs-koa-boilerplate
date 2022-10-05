import Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';
import mongoose from 'mongoose';

import { HOST, MONGO_URI, PORT } from './config';
import { authRoutes } from './modules/auth';
import { postRoutes } from './modules/post';
import { oasV3 } from './swagger';

const app = new Koa();

mongoose.connect(MONGO_URI);

app.use(bodyparser());
app.use(mount('/api/auth', authRoutes));
app.use(mount('/api/post', postRoutes));

app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      spec: oasV3 as any,
    },
  }),
);

app.listen(PORT, HOST);
