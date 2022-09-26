import { IParseErrors } from './IParseErrors';

export interface IParseResult<T> {
  value: T;
  success: boolean;
  errors: IParseErrors;
}
