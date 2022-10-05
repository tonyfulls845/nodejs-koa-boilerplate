import { User, UserData } from '../../models/User';
import { RegisterRequestModel } from '../schemas.interfaces';

export const register = async (data: RegisterRequestModel) => {
  const user = new User<UserData>(data);
  await user.save();
  const userData = user.toObject();
  delete userData.password;

  return userData;
};
