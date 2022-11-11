import { MONGO_URI } from '../config';
import { mongoose } from '../models';

export default async () => {
  console.info('clean db');

  await mongoose.connect(MONGO_URI);
  await mongoose.connection.dropDatabase();

  await mongoose.disconnect();
};
