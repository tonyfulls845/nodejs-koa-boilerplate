import request from 'supertest';

import { app } from './app';
import { apiPrefix, routes } from './constants/routes';

describe('Router', () => {
  describe('Public', () => {
    test('Test swagger route', async () => {
      const response = await request(app.callback()).get(`${apiPrefix}${routes.swagger}`);
      expect(response.status).toBe(200);
    });

    test('Test handle of not found page', async () => {
      const response = await request(app.callback()).get('/random-not-exist-page');
      expect(response.status).toBe(404);
    });
  });
});
