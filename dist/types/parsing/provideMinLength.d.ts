import { IHasLength } from './IHasLength';
import { IParseResult } from './IParseResult';
export declare function provideMinLength<T extends IHasLength>(minLength: number, exclusive: boolean, negate: boolean): (value: T) => IParseResult<T>;
