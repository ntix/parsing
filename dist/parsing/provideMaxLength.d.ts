import { IHasLength } from './IHasLength';
import { IParseResult } from './IParseResult';
export declare function provideMaxLength<T extends IHasLength>(maxLength: number, exclusive: boolean, negate: boolean): (value: T) => IParseResult<T>;
