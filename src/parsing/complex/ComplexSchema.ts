import { IParser } from '../IParser';

export type ComplexSchema<T> = {
  [k in keyof T]: IParser<T[k]>;
}
