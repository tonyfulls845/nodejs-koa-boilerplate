import bcrypt from 'bcrypt';
import { Model, Schema, model } from 'mongoose';

export interface UserData {
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserDocument extends UserData, Document {
  comparePassword: (password: string) => Promise<boolean>;
}

export const UserSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true, maxlength: 256 },
  lastName: { type: String, required: true, maxlength: 256 },
  password: { type: String },
});

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const generatedSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, generatedSalt);

  return next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<UserDocument, Model<UserDocument>>('User', UserSchema);
