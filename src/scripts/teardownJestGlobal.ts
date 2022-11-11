import mongoose from 'mongoose';

import { MONGO_URI } from '../config';

export default async () => {
  console.info('clean db');

  await mongoose.connect(MONGO_URI);
  await mongoose.connection.dropDatabase();
};
