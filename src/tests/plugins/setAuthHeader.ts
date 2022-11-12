import { Plugin } from 'superagent';

export const setAuthHeader =
  (token: string): Plugin =>
  (req) => {
    req.set('Authorization', 'Bearer ' + token);
  };
