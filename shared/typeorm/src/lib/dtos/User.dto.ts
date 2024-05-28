import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/User.entity';

const createUserFields: Readonly<Array<keyof User>> = [
  'name',
  'email',
  'dob',
  'position',
  'department',
  'password',
] as const;
export class CreateUserDto extends PickType(User, createUserFields) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
