import jwt from 'jsonwebtoken';

import { JWT_EXPIRATION, JWT_SECRET } from '../../config';
import { User, UserData } from '../../models/User';
import { LoginRequestModel, RegisterRequestModel } from '../schemas.interfaces';

export const register = async (data: RegisterRequestModel) => {
  const user = new User<UserData>(data);
  await user.save();
  const userData = user.toObject();
  delete userData.password;

  return userData;
};

export const login = async ({ email, password }: LoginRequestModel) => {
  const user = await User.findOne().where('email', email).select('+password').exec();

  if (!user) {
    return null;
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (isPasswordMatched) {
    const userData = user.toObject();
    delete userData.password;

    const token = jwt.sign(
      {
        data: {
          _id: user._id,
        },
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION },
    );

    return {
      user: userData,
      token,
    };
  }
  return null;
};
