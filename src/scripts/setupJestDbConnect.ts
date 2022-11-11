import { MONGO_URI } from '../config';

beforeAll(async () => {
  await globalThis.mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await globalThis.mongoose.connection.close();
});
