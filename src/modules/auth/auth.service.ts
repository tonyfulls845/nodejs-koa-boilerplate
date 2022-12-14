import jwt from 'jsonwebtoken';

import { JWT_EXPIRATION, JWT_SECRET } from '../../config';
import { AppJWTPayload } from '../../interfaces/auth';
import { AuthError } from '../../interfaces/errors';
import { LoginRequestDto, RegisterRequestDto, UserDto } from '../../jsonSchemas/interfaces';
import { User } from '../../models';

export const register = async (data: RegisterRequestDto) => {
  const user = new User<UserDto>(data);
  await user.save();

  return user.toObject();
};

export const login = async ({ email, password }: LoginRequestDto) => {
  const user = await User.findOne().where('email', email).select('+password').exec();

  if (!user) {
    throw new AuthError('No user');
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (isPasswordMatched) {
    const userData = user.toObject();

    const jwtPayload: AppJWTPayload = {
      data: {
        _id: user._id,
      },
    };
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return {
      user: userData,
      token,
    };
  }

  throw new AuthError('Wrong password');
};
