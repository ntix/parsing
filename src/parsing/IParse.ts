import { IParseResult } from './IParseResult';

export interface IParse<T> {
  (value: any): IParseResult<T>;
}
