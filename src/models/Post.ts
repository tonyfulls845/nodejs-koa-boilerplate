import { Document, Model, Schema, model } from 'mongoose';

import { NestedDtoWithId } from '../interfaces/generics';
import { PostDto } from '../jsonSchemas/interfaces';

export interface PostDocument extends NestedDtoWithId<PostDto>, Document<any, any, NestedDtoWithId<PostDto>> {}

export type PostModel = Model<PostDocument>;

export const PostSchema = new Schema<PostDocument>({
  message: { type: String, required: true, maxlength: 256 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Post = model<PostDocument, PostModel>('Post', PostSchema);
