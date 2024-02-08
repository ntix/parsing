import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';
import { NumberParsableTypes } from './NumberParsableTypes';

/** Fluent API interfaces for floating points */
export namespace IFloat {

  export interface Parser extends IParser<number> {
    readonly not: NextBuilder<Parser, 'not' | 'parse'>;

    equals(value: NumberParsableTypes | null | undefined): NextBuilder<Parser, 'equals', 'not' | 'parse'>;
    anyOf(values: NumberParsableTypes[]): NextBuilder<Parser, 'anyOf', 'not' | 'parse'>;

    min(value: NumberParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'min', 'not' | 'parse'>;
    max(value: NumberParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'max', 'not' | 'parse'>;
  }
}
