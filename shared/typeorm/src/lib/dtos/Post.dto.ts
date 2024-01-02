import { Post as PostEntity } from "../entities/Post.entity";

export type PostDto = PostEntity;

export type CreatePostDto = Omit<PostDto, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'user'>;

export type UpdatePostDto = Partial<CreatePostDto>;

export type DeletePostDto = PostDto['id'];
