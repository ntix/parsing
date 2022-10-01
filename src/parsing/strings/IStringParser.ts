import { IParser } from '../IParser';
import { IStringBuilder } from './IStringBuilder';

export interface IStringParser extends IParser<string>, IStringBuilder {
  readonly not: IStringBuilder;
}
