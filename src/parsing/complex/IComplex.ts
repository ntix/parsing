import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

export namespace IComplex {

  export interface Parser<T = unknown> extends IParser<T> {
    readonly not: NextBuilder<Parser<T>, 'not' | 'parse'>

    equals(value: T | null | undefined): NextBuilder<Parser<T>, 'equals', 'parse' | 'not'>
  }
}
