import { IParser } from './IParser';

export interface IMaxBuilder<T> {
  max(value: T): IParser<T>;
}
