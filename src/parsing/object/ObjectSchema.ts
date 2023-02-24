import { IParser } from '../IParser';

export type ObjectSchema<T> = {
  [k in keyof T]: IParser<T[k], T>;
}
