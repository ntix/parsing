import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';
import { Dictionary } from './Dictionary';

/** Fluent API interfaces for Dictionaries */
export namespace IDictionary {

  export interface Parser<T = unknown> extends IParser<Dictionary<T>> {
    readonly not: NextBuilder<Parser<T>, 'of' | 'each' | 'not'>

    /** declare the type of each item */
    readonly of: <U>() => NextBuilder<Parser<U>, 'of' | 'each'>
    /** parse each item with a parser */
    readonly each: <U = T>(parser: IParser<U>) => NextBuilder<Parser<U>, 'of' | 'each'>

    /** minimum length of the array */
    readonly minLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of' | 'each' | 'minLength', 'not' | 'parse'>;
    /** maximum length of the array */
    readonly maxLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of' | 'each' | 'maxLength', 'not' | 'parse'>;
  }
}
