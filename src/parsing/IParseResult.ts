import { IParseErrors } from './IParseErrors';
import { Nullable } from './Nullable';

export interface IParseResult<T> {
  value: Nullable<T>;
  success: boolean;
  errors: IParseErrors;
}
