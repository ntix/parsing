import { IParser } from '../IParser';
import { IFloatBuilder } from './IFloatBuilder';

export interface IFloatParser extends IParser<number>, IFloatBuilder {
  readonly not: IFloatBuilder;
}
