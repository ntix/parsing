import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';
import { Nullable } from '../Nullable';
import { NumberEnumMap } from './NumberEnumMap';
import { NumberParsableTypes } from './NumberParsableTypes';

/** Fluent API interfaces for integers */
export namespace IInt {

  export interface Parser extends IParser<number> {
    withRadix: (value?: number) => NextBuilder<Parser, 'withRadix', 'parse'>;

    readonly not: NextBuilder<Parser, 'not' | 'parse'>;

    equals(value: Nullable<NumberParsableTypes>): NextBuilder<Parser, 'equals', 'not' | 'parse'>;
    anyOf(values: NumberParsableTypes[] | NumberEnumMap): NextBuilder<Parser, 'anyOf', 'not' | 'parse'>;

    min(value: NumberParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'min', 'not' | 'parse'>;
    max(value: NumberParsableTypes, exclusive?: boolean): NextBuilder<Parser, 'max', 'not' | 'parse'>;
  }
}
