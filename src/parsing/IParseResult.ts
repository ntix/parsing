import { IParseErrors } from './IParseErrors';

/**
 * A Parse result which always returns with ParseErrors to enable negate
 */
export interface IParseResult<T> {
    value: T | null;
    success: boolean;
    errors: IParseErrors;
}
