import { CreatePostRequestDto, PostDto } from '../../jsonSchemas/interfaces';
import { Post, UserDocument } from '../../models';

export const create = async (data: CreatePostRequestDto, user: UserDocument) => {
  const post = new Post<PostDto>({ ...data, user: user._id });
  await post.save();

  return post.toObject();
};
