import { User as UserEntity } from "../entities/User.entity";

export type UserDto = InstanceType<typeof UserEntity>;

export type CreateUserDto = Pick<
  UserDto,
  'name' | 'email' | 'dob' | 'position' | 'department' | 'password'
>;

export type UpdateUserDto = Partial<
  Omit<CreateUserDto, 'id' | 'createdAt' | 'updatedAt'>
>;

export type UserIdDto = UserDto['id'];
