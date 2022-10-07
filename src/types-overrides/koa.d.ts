import 'koa';

declare module 'koa' {
  interface DefaultState {
    user: null;
  }
}
