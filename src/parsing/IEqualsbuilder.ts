import { IParser } from './IParser';

export interface IEqualsbuilder<T, TIn = T> {
  equals(value: TIn): IParser<T>;
}
