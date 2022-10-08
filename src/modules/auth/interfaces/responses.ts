import { LeanDocument } from 'mongoose';

import { UserDto } from '../../../models/User';

export type RegisterResponseDto = LeanDocument<UserDto>;

export type LoginResponseDto = {
  token: string;
  user: LeanDocument<UserDto>;
};
