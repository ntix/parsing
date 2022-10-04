import { IParseResult } from './IParseResult';

export interface IParse<T> {
  (value: unknown): IParseResult<T>
}
