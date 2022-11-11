import { execSync } from 'child_process';

import { MONGO_URI } from '../config';
import { mongoose } from '../models';

export default async () => {
  console.info('setup db');

  await mongoose.connect(MONGO_URI);
  await mongoose.connection.dropDatabase();

  const migrateRes = execSync(`migrate up --dbConnectionUri ${MONGO_URI} --autosync`);

  console.info(migrateRes.toString());
};
