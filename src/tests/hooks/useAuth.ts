import request from 'supertest';

import { app } from '../../app';
import { apiPrefix, routes } from '../../constants/routes';
import { RegisterRequestDto } from '../../jsonSchemas/interfaces';
import { User } from '../../models';

export const getRegisterRequestData = (email: string): RegisterRequestDto => ({
  firstName: 'Jonh',
  lastName: 'Smith',
  sex: 'male',
  password: 'password',
  email,
});

export const registerRequest = async (data: RegisterRequestDto) =>
  await request(app.callback()).post(`${apiPrefix}${routes.register}`).send(data);

export const loginRequest = async ({ email, password }: RegisterRequestDto) =>
  await request(app.callback()).post(`${apiPrefix}${routes.login}`).send({ email, password });

export type AuthRef = Partial<{ token: string | null }>;

export const useAuth = (data: RegisterRequestDto, ref: AuthRef, shouldRegister?: boolean) => {
  beforeAll(async () => {
    if (shouldRegister) {
      await registerRequest(data);
    }

    const response = await loginRequest(data);
    expect(response.status);

    ref.token = response.body.token;
  });

  afterAll(async () => {
    if (shouldRegister) {
      await User.deleteOne({ email: data.email });
    }
  });
};
