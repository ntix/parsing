import { IParser } from './IParser';
import { IParse } from './IParse';
export declare function parseChain<T>(parent: IParser<unknown>, current: IParse<T>): IParse<T>;
