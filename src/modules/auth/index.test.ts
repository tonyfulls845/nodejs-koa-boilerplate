import { pick } from 'lodash';
import request from 'supertest';

import { app } from '../../app';
import { apiPrefix, routes } from '../../constants/routes';
import { RegisterRequestDto } from '../../jsonSchemas/interfaces';
import { User } from '../../models';

const getRegisterRequestData = (email: string): RegisterRequestDto => ({
  firstName: 'Jonh',
  lastName: 'Smith',
  sex: 'male',
  password: 'password',
  email,
});

const registerRequestData = getRegisterRequestData('register@example.com');
const login1RequestData = getRegisterRequestData('login1@example.com');
const login2RequestData = getRegisterRequestData('login2@example.com');

const userProps = ['firstName', 'lastName', 'sex'];

const registerRequest = async (data: RegisterRequestDto) =>
  await request(app.callback()).post(`${apiPrefix}${routes.register}`).send(data);

const loginRequest = async ({ email, password }: RegisterRequestDto) =>
  await request(app.callback()).post(`${apiPrefix}${routes.login}`).send({ email, password });

describe('Router', () => {
  describe('Public', () => {
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
      let token: string;

      beforeAll(async () => {
        await registerRequest(login2RequestData);
        const response = await loginRequest(login2RequestData);
        token = response.body.token;
      });

      test('Test me', async () => {
        const response = await request(app.callback())
          .get(`${apiPrefix}${routes.me}`)
          .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
      });

      afterAll(async () => {
        await User.deleteOne({ email: login2RequestData.email });
      });
    });

    afterAll(async () => {
      await User.deleteOne({ email: registerRequestData.email });
      await User.deleteOne({ email: login1RequestData.email });
    });
  });
});
