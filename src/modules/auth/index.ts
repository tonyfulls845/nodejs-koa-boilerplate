import Router from "@koa/router";

import * as controller from "./auth.controller";

import { validateMiddleware } from "../../middlewares";
import { registerRules } from "./validators";

export const authRouter = new Router();

authRouter.post(
  "/register",
  validateMiddleware(registerRules),
  controller.register
);
