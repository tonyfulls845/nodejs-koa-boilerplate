import { Model, Schema } from 'mongoose';

import { RoleDto } from '../jsonSchemas/interfaces';
import { Document } from '../utils/models';

import { mongoose } from './mongoose';

export type RoleDocument = Document<RoleDto>;

export type RoleModel = Model<RoleDocument>;

export const RoleSchema = new Schema<RoleDocument>({
  code: { type: String, required: true, maxlength: 256 },
});

export const Role = mongoose.model<RoleDocument, RoleModel>('Role', RoleSchema);
