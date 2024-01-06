import { User as UserEntity } from "../entities/User.entity";

export type UserDto = InstanceType<typeof UserEntity>;

export type CreateUserDto = Omit<
  UserDto,
  'id' | 'createdAt' | 'updatedAt' | 'projects'
>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type UserIdDto = UserDto['id'];
