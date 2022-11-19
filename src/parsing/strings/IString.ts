import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for strings */
export namespace IString {

  export interface Parser extends IParser<string> {
    /** negate the parser */
    readonly not: NextBuilder<Parser, 'not' | 'parse'>;

    /** equals the passed value */
    equals(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'equals', 'not' | 'parse'>;
    /** one of the passed values */
    oneOf(values: string[], ignoreCase?: boolean): NextBuilder<Parser, 'oneOf', 'not' | 'parse'>;

    /** length is greater or equal to passed value */
    minLength(value: number, exclusive?: boolean): NextBuilder<Parser, 'minLength', 'not' | 'parse'>;
    /** length is less or equal to passed value */
    maxLength(value: number, exclusive?: boolean): NextBuilder<Parser, 'maxLength', 'not' | 'parse'>;
    /** matches passed regex */
    matches(value: string | RegExp, name?: string): NextBuilder<Parser, 'matches' | 'includes' | 'startsWith' | 'endsWith', 'not' | 'parse'>;
    /** include passed value */
    includes(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'includes' | 'matches', 'not' | 'parse'>;
    /** starts with passed value */
    startsWith(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'startsWith' | 'matches', 'not' | 'parse'>;
    /** ends with passed value */
    endsWith(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'endsWith' | 'matches', 'not' | 'parse'>;
  }
}
