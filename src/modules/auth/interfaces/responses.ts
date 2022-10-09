import { LeanDocument } from 'mongoose';

import { UserDto } from '../../../models';

export type RegisterResponseDto = LeanDocument<UserDto>;

export type LoginResponseDto = {
  token: string;
  user: LeanDocument<UserDto>;
};
