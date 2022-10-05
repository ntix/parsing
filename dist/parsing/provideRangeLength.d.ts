import { IHasLength } from './IHasLength';
import { IParseResult } from './IParseResult';
export declare function provideRangeLength<T extends IHasLength>(minLength: number, maxLength: number, exclusive: boolean, negate: boolean): (value: T) => IParseResult<T>;
