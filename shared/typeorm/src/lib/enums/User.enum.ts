import { ObjectValues } from '../../utils';

export const POSITIONS = {
  MANAGER: 'Manager',
  DEVELOPER: 'Developer',
  GROUP_MANAGER: 'GroupManager'
} as const;

export const DEPARTMENTS = {
  ENGINEERING: 'Engineering',
  MARKETING: 'Marketing',
  SALES: 'Sales'
} as const;

export type POSITION = ObjectValues<typeof POSITIONS>;

export type DEPARTMENT = ObjectValues<typeof DEPARTMENTS>;
