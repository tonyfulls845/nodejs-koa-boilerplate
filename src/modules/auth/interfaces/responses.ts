import { UserDto } from '../../../models/User';

export type RegisterResponseDto = UserDto;

export type LoginResponseDto = {
  token: string;
  user: UserDto;
};
