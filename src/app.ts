import Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import bodyparser from 'koa-bodyparser';

import { APP_URI, HOST, MONGO_URI, NODE_ENV, PORT } from './config';
import { routes } from './constants/routes';
import { convertKoaThrowMiddleware, errorHandlerMiddleware } from './middlewares';
import { mongoose } from './models';
import './modules/auth';
import './modules/post';
import './modules/user';
import { protectedRouter, router } from './router';
import { oasV3 } from './swagger';

export const app = new Koa();

app.use(errorHandlerMiddleware);
app.use(convertKoaThrowMiddleware);
app.use(bodyparser());
app.use(
  koaSwagger({
    routePrefix: routes.swagger,
    swaggerOptions: {
      spec: oasV3 as any,
    },
  }),
);
app.use(router.routes());
app.use(protectedRouter.routes());

// In a test environment, when running the server through Supertest, you don't need to have the app listen on a network port.
if (NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URI);
  console.info(`Running app on ${APP_URI}${routes.swagger}`);
  app.listen(PORT, HOST);
}

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(0);
});
