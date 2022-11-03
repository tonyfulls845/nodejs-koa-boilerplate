import { Document, Model, Schema, model } from 'mongoose';

import { RoleDto } from '../jsonSchemas/interfaces';

export interface RoleDocument extends RoleDto, Document<any, any, RoleDto> {}

export type RoleModel = Model<RoleDocument>;

export const RoleSchema = new Schema<RoleDocument>({
  code: { type: String, required: true, maxlength: 256 },
});

export const Role = model<RoleDocument, RoleModel>('Role', RoleSchema);