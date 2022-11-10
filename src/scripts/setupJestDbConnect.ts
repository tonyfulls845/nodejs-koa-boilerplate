import { MONGO_URI } from '../config';
import { mongoose } from '../models';

mongoose.connect(MONGO_URI);

afterAll(async () => {
  await mongoose.connection.close();
});
