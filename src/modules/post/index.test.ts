import request from 'supertest';

import { app } from '../../app';
import { apiPrefix, routes, routesParams } from '../../constants/routes';
import { CreatePostRequestDto } from '../../jsonSchemas/interfaces';
import { adminRegisterData } from '../../migrations/1668192264800-add_admin_user';
import { AuthRef, getRegisterRequestData, useAuth } from '../../tests/hooks/useAuth';
import { setAuthHeader } from '../../tests/plugins/setAuthHeader';

const createPostRequestData: CreatePostRequestDto = {
  message: 'message',
};

const createPostRequest = (token: string) =>
  request(app.callback()).post(`${apiPrefix}${routes.post}`).send(createPostRequestData).use(setAuthHeader(token));

const deletePostRequest = async (token: string, postId: string) => {
  return request(app.callback())
    .delete(`${apiPrefix}${routes.postDetail}`.replace(`:${routesParams.post}`, postId))
    .use(setAuthHeader(token));
};

describe('Post router', () => {
  describe('Post owner', () => {
    const authRef: AuthRef = {};
    const adminAuthRef: AuthRef = {};

    const registerRequestData = getRegisterRequestData(`login${Math.random()}@example.com`);

    useAuth(registerRequestData, authRef, true);
    useAuth(adminRegisterData, adminAuthRef);

    test('Test add post', async () => {
      const response = await createPostRequest(authRef.token);
      expect(response.status).toBe(201);

      const deleteResponse = await deletePostRequest(authRef.token, response.body._id);
      expect(deleteResponse.status).toBe(200);
    });

    test('Test delete post by post owner', async () => {
      const createResponse = await createPostRequest(authRef.token);
      expect(createResponse.status).toBe(201);

      const response = await deletePostRequest(authRef.token, createResponse.body._id);

      expect(response.status).toBe(200);
    });

    test('Test delete post by admin', async () => {
      const createResponse = await createPostRequest(authRef.token);
      expect(createResponse.status).toBe(201);

      const response = await deletePostRequest(adminAuthRef.token, createResponse.body._id);
      expect(response.status).toBe(200);
    });
  });
});
