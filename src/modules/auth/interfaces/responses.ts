import { UserData } from '../../../models/User';

export type RegisterResponseModel = UserData;

export type LoginResponseModel = {
  token: string;
  user: UserData;
};
