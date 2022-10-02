import { IParser } from './IParser';

export interface IAnyOfBuilder<T, TValue = T> {
  anyOf(value: TValue): IParser<T>;
}
