import { execSync } from 'child_process';
import path from 'path';

import { MONGO_URI } from '../config';
import { mongoose } from '../models';

export default async () => {
  console.info('setup db');

  await mongoose.connect(MONGO_URI);
  await mongoose.connection.dropDatabase();

  console.info(
    execSync(
      `${path.resolve(__dirname, '../../node_modules/.bin/migrate')} up --dbConnectionUri ${MONGO_URI} --autosync`,
    ).toString(),
  );
};
