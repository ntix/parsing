import { IParseResult } from './IParseResult';

/**
 * A parse function
 */
export interface IParse<T> {
    (value: unknown): IParseResult<T>;
}
