import { IParser } from './IParser';

/**
 * A parser function and negate value
 * 
 * The parse function should return a negatable (non-normal) result
 * ie, it should return errors on success and failure to parse 
 * so the result can be negated
 */
export interface ICurrentParser<T> extends IParser<T> {
    negate: boolean;
}
