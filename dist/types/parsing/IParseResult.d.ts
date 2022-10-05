import { IParseErrors } from './IParseErrors';
export interface IParseResult<T> {
    value: T | null;
    success: boolean;
    errors: IParseErrors;
}
