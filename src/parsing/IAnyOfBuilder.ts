import { IParser } from './IParser';

export interface IAnyOfBuilder<T, TValue> {
  anyOf(value: TValue): IParser<T>;
}
