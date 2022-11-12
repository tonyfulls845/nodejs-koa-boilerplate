import { pick } from 'lodash';
import request from 'supertest';

import { app } from '../../app';
import { apiPrefix, routes } from '../../constants/routes';
import { User } from '../../models';
import { AuthRef, getRegisterRequestData, loginRequest, registerRequest, useAuth } from '../../tests/hooks/useAuth';
import { setAuthHeader } from '../../tests/plugins/setAuthHeader';

const userProps = ['firstName', 'lastName', 'sex'];

describe('Auth router', () => {
  describe('Public', () => {
    const login1RequestData = getRegisterRequestData(`login1${Math.random()}@example.com`);
    const login2RequestData = getRegisterRequestData(`login2${Math.random()}@example.com`);
    const registerRequestData = getRegisterRequestData(`register${Math.random()}@example.com`);

    test('Test register new user', async () => {
      const response = await registerRequest(registerRequestData);
      expect(response.status).toBe(201);
    });

    test('Test login', async () => {
      await registerRequest(login1RequestData);
      const response = await loginRequest(login1RequestData);
      expect(response.status).toBe(200);
      expect(pick(response.body.user, ...userProps)).toEqual(pick(login1RequestData, ...userProps));
      expect(response.body.token).toBeTruthy();
    });

    describe('Protected', () => {
      const authRef: AuthRef = {};
      useAuth(login2RequestData, authRef, true);

      test('Test me', async () => {
        const response = await request(app.callback())
          .get(`${apiPrefix}${routes.me}`)
          .use(setAuthHeader(authRef.token));

        expect(response.status).toBe(200);

        expect(pick(response.body, ...userProps)).toEqual(pick(login2RequestData, ...userProps));
      });
    });

    afterAll(async () => {
      await User.deleteOne({ email: registerRequestData.email });
      await User.deleteOne({ email: login1RequestData.email });
    });
  });
});
