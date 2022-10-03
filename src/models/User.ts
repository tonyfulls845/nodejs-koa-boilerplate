import { Schema, model } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  avatar?: string;
}

export const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true, maxlength: 256 },
  lastName: { type: String, required: true, maxlength: 256 },
  avatar: { type: String },
});

export const User = model<IUser>('User', UserSchema);
