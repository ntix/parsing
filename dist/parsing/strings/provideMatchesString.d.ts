import { IParseResult } from '../IParseResult';
export declare function provideMatchesString(matchValue: string | RegExp, name: string, negate: boolean): (value: string) => IParseResult<string>;
