import { IHasLength } from './IHasLength';
import { IMaxLengthBuilder } from './IMaxLengthBuilder';
import { IMinLengthBuilder } from './IMinLengthBuilder';
import { IParser } from './IParser';

export interface IMinMaxLengthBuilder<T extends IHasLength> {
  minLength(value: number): IMaxLengthBuilder<T> & IParser<T>;
  maxLength(value: number): IMinLengthBuilder<T> & IParser<T>;
}
