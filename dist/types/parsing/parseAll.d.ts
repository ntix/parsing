import { IParse } from './IParse';
import { IParseResult } from './IParseResult';
/**
 * parse all elements of an array
 *
 * @param parse function
 * @returns IParseResult<T[]>
 */
export declare function parseAll<T>(parse: IParse<T>): (values: unknown[]) => IParseResult<any>;
