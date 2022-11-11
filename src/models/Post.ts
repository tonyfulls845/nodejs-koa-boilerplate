import { Document, Model, Schema } from 'mongoose';

import { NestedModelWithId } from '../interfaces/generics';
import { PostDto } from '../jsonSchemas/interfaces';

import { mongoose } from './mongoose';

export interface PostDocument extends NestedModelWithId<PostDto>, Document<any, any, NestedModelWithId<PostDto>> {}

export type PostModel = Model<PostDocument>;

export const PostSchema = new Schema<PostDocument>({
  message: { type: String, required: true, maxlength: 256 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Post = mongoose.model<PostDocument, PostModel>('Post', PostSchema);
