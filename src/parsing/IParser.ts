import { IParseResult } from './IParseResult';

export interface IParser<T> {
  parse(value: any): IParseResult<T>;
}
