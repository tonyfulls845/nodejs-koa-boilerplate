import { Document, Model, Schema, model } from 'mongoose';

import { PostDto } from '../jsonSchemas/interfaces';

export interface PostDocument extends PostDto, Document<any, any, PostDto> {}

export type PostModel = Model<PostDocument>;

export const PostSchema = new Schema<PostDocument>({
  message: { type: String, required: true, maxlength: 256 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Post = model<PostDocument, PostModel>('Post', PostSchema);
