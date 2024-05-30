import { BgColorCombination, colorName, colorType, PROJECT_STATUS, TextColorCombination } from './types';

export const colorMap: { [key in colorType]: colorName } = {
  success: 'green',
  info: 'blue',
  warning: 'orange',
  danger: 'red',
};

export const statusColorMap: {
  [key in PROJECT_STATUS]: [TextColorCombination, BgColorCombination?]
} = {
  'To Do': ['text-blue-300', 'bg-orange-100'],
  'In Progress': ['text-blue-900', 'bg-green-400'],
  'Done': ['text-blue-700', 'bg-green-100'],
  'Incomplete': ['text-purple-800', 'bg-red-400'],
  'Archived': ['text-slate-900', 'bg-slate-200'],
};

export const STATUSES = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  INCOMPLETE: 'Incomplete',
  ARCHIVED: 'Archived',
} as const;

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

export const SORT_BY = {
  Id: 'id',
  Name: 'name',
  CreatedAt: 'createdAt',
  UpdatedAt: 'updatedAt',
} as const;

export const ORDER_BY = {
  Asc: 'asc',
  Desc: 'desc',
} as const;
