import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';
import { Dictionary } from './Dictionary';

/** Fluent API interfaces for Dictionaries */
export namespace IDictionary {

  export interface Parser<T = unknown> extends IParser<Dictionary<T>> {
    readonly not: NextBuilder<Parser<T>, 'of' | 'each' | 'not'>

    readonly of: <U>() => NextBuilder<Parser<U>, 'of' | 'each'>
    readonly each: <U = T>(parser: IParser<U>) => NextBuilder<Parser<U>, 'of' | 'each'>
  }
}
