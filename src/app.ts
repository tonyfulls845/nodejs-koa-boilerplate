import Koa from "koa";
import mount from "koa-mount";

import mongoose from "mongoose";
const app = new Koa();

import { MONGO_URI, PORT } from "./config";
import { authRouter } from "./modules/auth";

mongoose.connect(MONGO_URI);

app.use(mount("/api/auth", authRouter));

app.listen(PORT);
