import { User as UserEntity } from "../entities/User.entity";

export type UserDto = UserEntity;

export type CreateUserDto = Omit<UserDto, 'id' | 'createdAt' | 'updatedAt' | 'posts'>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type DeleteUserDto = UserDto['id'];
