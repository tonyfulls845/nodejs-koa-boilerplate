import Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import bodyparser from 'koa-bodyparser';
import jwt from 'koa-jwt';
import mount from 'koa-mount';
import mongoose from 'mongoose';

import { HOST, JWT_SECRET, MONGO_URI, PORT } from './config';
import { errorHandlerMiddleware } from './middlewares';
import { authRoutes } from './modules/auth';
import { postRoutes } from './modules/post';
import { oasV3 } from './swagger';

const app = new Koa();

mongoose.connect(MONGO_URI);

app.use(errorHandlerMiddleware);
app.use(bodyparser());
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      spec: oasV3 as any,
    },
  }),
);
app.use(mount('/api/auth', authRoutes));
app.use(jwt({ secret: JWT_SECRET }));
app.use(mount('/api/post', postRoutes));

app.listen(PORT, HOST);
