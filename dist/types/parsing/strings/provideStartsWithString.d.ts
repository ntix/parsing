import { IParseResult } from '../IParseResult';
export declare function provideStartsWithString(startswithValue: string, ignoreCase: boolean, negate: boolean): (value: string) => IParseResult<string>;
