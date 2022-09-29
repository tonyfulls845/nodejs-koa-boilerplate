import Koa from "koa";
import mongoose from "mongoose";
const app = new Koa();

import { MONGO_URI } from "./config";
import { UserSchema } from "./models/User";

console.log(MONGO_URI);

mongoose.connect(MONGO_URI).then(console.log).catch(console.log);

app.use(async (ctx) => {
  const user = mongoose.model("User", UserSchema);
  console.log(user);

  ctx.body = "Hello World";
});

app.listen(3000);
