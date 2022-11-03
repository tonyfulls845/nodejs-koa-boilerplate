/**
 * Make any changes you need to make to the database here
 */
import { Role } from '../src/models';

async function up() {
  await Role.create({ code: 'admin' });
  await Role.create({ code: 'user' });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  await Role.find({ code: 'admin' }).remove();
  await Role.find({ code: 'user' }).remove();
}
