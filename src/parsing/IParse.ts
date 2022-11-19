import { IParseResult } from './IParseResult';

export interface IParse<T, P = unknown> {
  (value: unknown, parentValue?: P): IParseResult<T>
}
