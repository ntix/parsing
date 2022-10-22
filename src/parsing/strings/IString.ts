import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for strings */
export namespace IString {

  export interface Parser extends IParser<string> {
    readonly not: NextBuilder<Parser, 'not' | 'parse'>;

    equals(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'equals', 'not' | 'parse'>;
    anyOf(values: string[], ignoreCase?: boolean): NextBuilder<Parser, 'anyOf', 'not' | 'parse'>;

    minLength(value: number, exclusive?: boolean): NextBuilder<Parser, 'minLength', 'not' | 'parse'>;
    maxLength(value: number, exclusive?: boolean): NextBuilder<Parser, 'maxLength', 'not' | 'parse'>;
    matches(value: string | RegExp, name?: string): NextBuilder<Parser, 'matches' | 'includes' | 'startsWith' | 'endsWith', 'not' | 'parse'>;
    includes(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'includes' | 'matches', 'not' | 'parse'>;
    startsWith(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'startsWith' | 'matches', 'not' | 'parse'>;
    endsWith(value: string, ignoreCase?: boolean): NextBuilder<Parser, 'endsWith' | 'matches', 'not' | 'parse'>;
  }
}
