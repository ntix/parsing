import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for booleans */
export namespace IBoolean {
  export interface Parser extends IParser<boolean> {
    readonly not: NextBuilder<Parser, 'not' | 'parse'>

    equals(value: boolean): NextBuilder<Parser, 'equals' | 'not', 'parse' | 'not'>
  }
}
