import { PROJECT_STATUS } from './lib/enums/Project.enum';

export type ObjectValues<T> = T[keyof T];

const COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'slate',
] as const;

type textColor = 'text';
type bgColor = 'bg';
type colorName = typeof COLORS[number];
type colorWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type colorType = 'success' | 'danger' | 'warning' | 'info';

export type TextColorCombination = `${textColor}-${colorName}-${colorWeight}`;
export type BgColorCombination = `${bgColor}-${colorName}-${colorWeight}`;
export type ElementColorCombination = `${textColor | bgColor}-${colorName}-${colorWeight}`;

export type Email = `${string}@${string}.${string}`;

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
  'In Progress': ['text-blue-300', 'bg-orange-100'],
  'Done': ['text-blue-700', 'bg-green-100'],
  'Incomplete': ['text-blue-300', 'bg-orange-100'],
  'Archived': ['text-slate-900'],
};
