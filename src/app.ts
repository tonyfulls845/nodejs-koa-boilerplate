import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';
import mongoose from 'mongoose';

import { MONGO_URI, PORT } from './config';
import { auth } from './modules/auth';

const app = new Koa();

mongoose.connect(MONGO_URI);

app.use(bodyparser());
app.use(mount('/api/auth', auth));

app.listen(PORT);
