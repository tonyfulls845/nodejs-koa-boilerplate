import { Model, Schema } from 'mongoose';

import { PostDto } from '../jsonSchemas/interfaces';
import { Document } from '../utils/models';

import { mongoose } from './mongoose';

export type PostDocument = Document<PostDto>;

export type PostModel = Model<PostDocument>;

export const PostSchema = new Schema<PostDocument>({
  message: { type: String, required: true, maxlength: 256 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Post = mongoose.model<PostDocument, PostModel>('Post', PostSchema);
