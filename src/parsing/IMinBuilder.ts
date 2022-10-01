import { IParser } from './IParser';

export interface IMinBuilder<T> {
  min(value: T): IParser<T>;
}
