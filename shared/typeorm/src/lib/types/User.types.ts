import { DEPARTMENTS, POSITIONS } from '../enums/User.enum';
import { CreateUserDto, UpdateUserDto, UserType } from '../dtos/User.dto';

export type CreateUserType = InstanceType<typeof CreateUserDto>;
/*export type CreateUserType = Pick<
  UserType,
  'name' | 'email' | 'dob' | 'position' | 'department' | 'password'
>;*/

export type UpdateUserType = InstanceType<typeof UpdateUserDto>;
/*export type UpdateUserType = Partial<
  Omit<CreateUserType, 'id' | 'createdAt' | 'updatedAt'>
>;*/

export type UserIdType = UserType['id'];

type Employee = Omit<UserType, 'position' | 'department' | 'createdAt' | 'updatedAt'>;

type ENG = typeof DEPARTMENTS.ENGINEERING;
type DEV = typeof POSITIONS.DEVELOPER;
type MGR = typeof POSITIONS.MANAGER;

export type Developer = Employee & Required<{
  position: DEV
  department: ENG
}>;

export type Manager = Employee & Required<{
  position: MGR
  department: ENG
}>;
