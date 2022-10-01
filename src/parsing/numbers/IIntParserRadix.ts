import { IParser } from '../IParser';
import { IIntBuilder } from './IIntBuilder';

export interface IIntParserRadix extends IParser<number>, IIntBuilder {
  readonly not: IIntBuilder;
}
