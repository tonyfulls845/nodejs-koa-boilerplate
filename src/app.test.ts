import { pick } from 'lodash';
import request from 'supertest';

import { app } from './app';
import { RegisterRequestDto } from './jsonSchemas/interfaces';
import { mongoose, mongooseConnection } from './models';

const registerRequestData: RegisterRequestDto = {
  firstName: 'Jonh',
  lastName: 'Smith',
  sex: 'male',
  password: 'password',
  email: 'email@example.com',
};

const userProps = ['firstName', 'lastName', 'sex'];

const registerRequest = async () => await request(app.callback()).post('/api/register').send(registerRequestData);

const loginRequest = async () =>
  await request(app.callback())
    .post('/api/login')
    .send({ email: registerRequestData.email, password: registerRequestData.password });

describe('Router', () => {
  beforeAll(async () => {
    await mongooseConnection;
    await mongoose.connection?.db?.dropDatabase();
  });

  describe('Public', () => {
    test('Test swagger route', async () => {
      const response = await request(app.callback()).get('/api/swagger');
      expect(response.status).toBe(200);
    });

    test('Test handle of not found page', async () => {
      const response = await request(app.callback()).get('/random-not-exist-page');
      expect(response.status).toBe(404);
    });

    test('Test register new user', async () => {
      const response = await registerRequest();
      expect(response.status).toBe(201);
    });

    test('Test login', async () => {
      await registerRequest();
      const response = await loginRequest();
      expect(response.status).toBe(200);
      expect(pick(response.body.user, ...userProps)).toEqual(pick(registerRequestData, ...userProps));
      expect(response.body.token).toBeTruthy();
    });

    describe('Protected', () => {
      let token: string;

      beforeAll(async () => {
        await mongoose.connection?.db?.dropDatabase();
        await registerRequest();
        const response = await loginRequest();
        token = response.body.token;
      });

      test('Test me', async () => {
        const response = await request(app.callback())
          .get('/api/me')
          .set('Authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
      });

      afterAll(async () => {
        await mongoose.connection?.db?.dropDatabase();
      });
    });

    afterAll(async () => {
      await mongoose.connection?.db?.dropDatabase();
    });
  });
});
