import { UserDto } from '../dtos/User.dto';
import { DEPARTMENTS, POSITIONS } from '../enums/User.enum';

type Employee = Omit<UserDto, 'position' | 'department' | 'createdAt' | 'updatedAt'>;

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
