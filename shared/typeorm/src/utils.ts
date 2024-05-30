import { FormControl } from '@angular/forms';

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
export type colorName = typeof COLORS[number];
type colorWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type colorType = 'success' | 'danger' | 'warning' | 'info';

export type TextColorCombination = `${textColor}-${colorName}-${colorWeight}`;
export type BgColorCombination = `${bgColor}-${colorName}-${colorWeight}`;
export type ElementColorCombination = `${textColor | bgColor}-${colorName}-${colorWeight}`;

export type Email = `${string}@${string}.${string}`;

type FormControlWrapper<Rec> = { [k in keyof Rec]: FormControl<Rec[k]> };
export type CustomTypedForm<T> = FormControlWrapper<T>;
