/**
 * Make any changes you need to make to the database here
 */
import mongoose from 'mongoose';

import { Role } from '../models';

export async function up() {
  await mongoose.connection.dropDatabase();

  await Role.create({ code: 'admin' });
  await Role.create({ code: 'user' });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down() {
  await Role.find({ code: 'admin' }).remove();
  await Role.find({ code: 'user' }).remove();
}
