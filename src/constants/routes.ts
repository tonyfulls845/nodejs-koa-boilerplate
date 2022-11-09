export const apiPrefix = '/api';

export const routesParams = {
  post: 'post',
  user: 'user',
};

export const routes = {
  swagger: '/swagger',
  register: '/register',
  login: '/login',
  post: '/post',
  postDetail: `/post/:${routesParams.post}`,
  me: '/me',
  user: '/user',
  userDetail: `/user/:${routesParams.user}`,
};
