import bcrypt from 'bcrypt';
import { Document, Model, Schema } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

import { UserDto } from '../jsonSchemas/interfaces';
import { Sex } from '../modules/user/enums';

import { mongoose } from './mongoose';

export interface UserHiddenDto extends UserDto {
  password: string;
}

export interface UserDocument extends UserHiddenDto, Document<any, any, UserHiddenDto> {
  comparePassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<UserDocument>;

export const UserSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true, maxlength: 256 },
  lastName: { type: String, required: true, maxlength: 256 },
  password: { type: String, hide: true },
  sex: { type: String, enum: Object.values(Sex) },
});

UserSchema.plugin(mongooseHidden({ defaultHidden: { _id: false } }));

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);
