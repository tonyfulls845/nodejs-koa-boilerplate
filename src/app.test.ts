import request from 'supertest';

import { app } from './app';

test('Test 404', async () => {
  const response = await request(app.callback()).get('/random-not-exist-page');
  expect(response.status).toBe(404);
});
