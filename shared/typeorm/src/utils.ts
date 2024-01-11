import { PROJECT_STATUS } from './lib/enums/Project.enum';

export type ObjectValues<T> = T[keyof T];

type textColor = 'text';
type bgColor = 'bg';
type colorName = 'orange' | 'green' | 'red' | 'blue' | 'grey';
type colorWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type colorType = 'success' | 'danger' | 'warning' | 'info';

export type TextColorCombination = `${textColor}-${colorName}-${colorWeight}`;
export type BgColorCombination = `${bgColor}-${colorName}-${colorWeight}`;
export type ElementColorCombination = `${textColor | bgColor}-${colorName}-${colorWeight}`;

export type Email = `${string}@${string}.${string}`;

export const colorMap: { [key in colorType]: colorName } = {
  success: 'blue',
  info: 'grey',
  warning: 'orange',
  danger: 'red',
};

export const statusColorMap: {
  [key in PROJECT_STATUS]: [TextColorCombination, BgColorCombination?]
} = {
  'To Do': ['text-blue-300', 'bg-orange-100'],
  'In Progress': ['text-blue-300', 'bg-orange-100'],
  'Done': ['text-blue-700', 'bg-grey-100'],
  'Incomplete': ['text-blue-300', 'bg-orange-100'],
  'Archived': ['text-grey-900'],
};
