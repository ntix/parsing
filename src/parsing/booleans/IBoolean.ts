import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for booleans */
export namespace IBoolean {
  export interface Parser extends IParser<boolean> {
    /** negate the parser */
    readonly not: NextBuilder<Parser, 'not'>

    /** equals the passed value */
    equals(value: boolean): NextBuilder<Parser, 'equals' | 'not'>
  }
}
