import { IHasLength } from './IHasLength';
import { IParser } from './IParser';

export interface IMinLengthBuilder<T extends IHasLength> {
  minLength(value: number): IParser<T>;
}
