import { IMaxBuilder } from './IMaxBuilder';
import { IMinBuilder } from './IMinBuilder';
import { IParser } from './IParser';

export interface IMinMaxBuilder<T> {
  min(value: T): IMaxBuilder<T> & IParser<T>;
  max(value: T): IMinBuilder<T> & IParser<T>;
}
