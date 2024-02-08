import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for booleans */
export namespace IBoolean {
  export interface Parser extends IParser<boolean> {
    readonly not: NextBuilder<Parser, 'not' | 'parse'>

    equals(value: boolean | null | undefined): NextBuilder<Parser, 'equals', 'parse' | 'not'>
  }
}
