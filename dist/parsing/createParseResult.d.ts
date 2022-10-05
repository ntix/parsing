import { IParseResult } from './IParseResult';
import { IParseErrors } from './IParseErrors';
export declare function createParseResult<T>(value: T, errors?: IParseErrors): IParseResult<T>;
