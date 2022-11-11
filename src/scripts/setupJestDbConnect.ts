import mongoose from 'mongoose';

import { MONGO_URI } from '../config';

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});
