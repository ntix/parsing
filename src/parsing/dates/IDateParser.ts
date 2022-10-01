import { IParser } from '../IParser';
import { IDateBuilder } from './IDateBuilder';

export interface IDateParser extends IParser<Date>, IDateBuilder {
  readonly not: IDateBuilder;
}
