export const validateMiddleware = (validator: any) => async (ctx, next) => {
  await next();
};
