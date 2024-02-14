import { BgColorCombination, colorName, colorType, PROJECT_STATUS, TextColorCombination } from '@typeorm';

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
