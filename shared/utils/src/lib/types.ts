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

type TextClassPrefix = 'text';
type BgClassPrefix = 'bg';
export type ColorName = typeof COLORS[number];
type ColorWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type ColorType = 'success' | 'danger' | 'warning' | 'info';

export type TextColorCombination = `${TextClassPrefix}-${ColorName}-${ColorWeight}`;
export type BgColorCombination = `${BgClassPrefix}-${ColorName}-${ColorWeight}`;
export type ElementColorCombination = `${TextClassPrefix | BgClassPrefix}-${ColorName}-${ColorWeight}`;

export type Email = `${string}@${string}.${string}`;

type FormControlWrapper<Rec> = { [k in keyof Rec]: FormControl<Rec[k]> };
export type CustomTypedForm<T> = FormControlWrapper<T>;

type OrderByKeys = keyof typeof ORDER_BY;
export type OrderBy = typeof ORDER_BY[OrderByKeys];

type SortByKeys = keyof typeof SORT_BY;
export type SortBy = typeof SORT_BY[SortByKeys];
