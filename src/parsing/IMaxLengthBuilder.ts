import { IHasLength } from './IHasLength';
import { IParser } from './IParser';

export interface IMaxLengthBuilder<T extends IHasLength> {
  maxLength(value: number): IParser<T>;
}
