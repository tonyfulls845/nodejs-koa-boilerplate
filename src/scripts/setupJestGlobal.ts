import { execSync } from 'child_process';
import mongoose from 'mongoose';

import { MONGO_URI } from '../config';

export default async () => {
  console.info('setup db');

  await mongoose.connect(MONGO_URI);
  await mongoose.connection.dropDatabase();

  execSync('migrate up --autosync', { stdio: 'inherit' });
};
