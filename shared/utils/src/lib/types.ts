import { FormControl } from '@angular/forms';
import { DEPARTMENTS, ORDER_BY, POSITIONS, SORT_BY, STATUSES } from './enums';

export type ObjectValues<T> = T[keyof T];

export type PROJECT_STATUS = ObjectValues<typeof STATUSES>;

export type POSITION = ObjectValues<typeof POSITIONS>;

export type DEPARTMENT = ObjectValues<typeof DEPARTMENTS>;

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
export type colorName = typeof COLORS[number];
type colorWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type colorType = 'success' | 'danger' | 'warning' | 'info';

export type TextColorCombination = `${textColor}-${colorName}-${colorWeight}`;
export type BgColorCombination = `${bgColor}-${colorName}-${colorWeight}`;
export type ElementColorCombination = `${textColor | bgColor}-${colorName}-${colorWeight}`;

export type Email = `${string}@${string}.${string}`;

type FormControlWrapper<Rec> = { [k in keyof Rec]: FormControl<Rec[k]> };
export type CustomTypedForm<T> = FormControlWrapper<T>;

type OrderByKeys = keyof typeof ORDER_BY;
export type OrderBy = typeof ORDER_BY[OrderByKeys];

type SortByKeys = keyof typeof SORT_BY;
export type SortBy = typeof SORT_BY[SortByKeys];
