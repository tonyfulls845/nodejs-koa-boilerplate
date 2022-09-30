import Koa from "koa";
import mongoose from "mongoose";
const app = new Koa();

import { MONGO_URI, PORT } from "./config";
import { IUser, User } from "./models/User";

mongoose.connect(MONGO_URI);

app.use(async (ctx) => {
  const user = new User<IUser>({ firstName: "1", lastName: "1" });
  await user.save();

  const all = await User.find();

  ctx.body = all;
});

app.listen(PORT);
