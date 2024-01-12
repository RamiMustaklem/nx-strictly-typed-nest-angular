import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/User.entity';

export type UserType = InstanceType<typeof User>;

/*export type CreateUserDto = Pick<
  InstanceType<typeof User>,
  'name' | 'email' | 'dob' | 'position' | 'department' | 'password'
>;*/

// const userOmittedFields: Readonly<Array<keyof UserType>> = ['id', 'createdAt', 'updatedAt', 'projects'] as const;
// export class UserDto extends OmitType(UserEntity, createUserOmittedFields) {}

const createUserFields: Readonly<Array<keyof UserType>> = [
  'name',
  'email',
  'dob',
  'position',
  'department',
  'password',
] as const;
export class CreateUserDto extends PickType(User, createUserFields) {}

/*export type UpdateUserDto = Partial<
  Omit<CreateUserDto, 'id' | 'createdAt' | 'updatedAt'>
>;*/

export class UpdateUserDto extends PartialType(CreateUserDto) {}
