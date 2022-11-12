/**
 * Make any changes you need to make to the database here
 */
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../config';
import { NestedModelWithId } from '../interfaces/generics';
import { Role, User, UserHiddenDto } from '../modelsConnected';
import { Sex } from '../modules/user/enums';

export const adminRegisterData = {
  firstName: 'Admin',
  lastName: 'Admin',
  sex: Sex.Male,
  password: ADMIN_PASSWORD,
  email: ADMIN_USERNAME,
};

export async function up() {
  const { _id } = await User.create<NestedModelWithId<UserHiddenDto>>(adminRegisterData);

  const adminRole = await Role.findOne({
    code: 'admin',
  });

  await User.updateMany({ _id }, { $addToSet: { roles: adminRole._id } });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down() {
  await User.find({ email: ADMIN_USERNAME }).remove();
}
