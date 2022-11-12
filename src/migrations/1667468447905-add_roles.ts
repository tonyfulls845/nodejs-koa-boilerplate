/**
 * Make any changes you need to make to the database here
 */
import { RoleDto } from '../jsonSchemas/interfaces';
import { Role } from '../modelsConnected';

export async function up() {
  await Role.create<RoleDto>({ code: 'admin' });
  await Role.create<RoleDto>({ code: 'user' });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down() {
  await Role.find({ code: 'admin' }).remove();
  await Role.find({ code: 'user' }).remove();
}
