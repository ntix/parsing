import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for arrays */
export namespace IArray {

  export interface Parser<T = unknown> extends IParser<T[]> {
    readonly not: NextBuilder<Parser<T>, 'not' | 'parse'>

    /** declare the type of each item */
    readonly of: <U = T>() => NextBuilder<Parser<U>, 'of' | 'each'>
    /** parse each item with a parser */
    readonly each: <U = T>(parser: IParser<U>) => NextBuilder<Parser<U>, 'each' | 'of'>

    /** check for uniqueness by a given distintor */
    readonly unique: <U = T>(distinctor: (item: U) => unknown) => NextBuilder<Parser<U>, 'unique' | 'of' | 'each'>;
    /** minimum length of the array */
    readonly minLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'minLength' | 'of' | 'each'>;
    /** maximum length of the array */
    readonly maxLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'maxLength' | 'of' | 'each'>;
  }
}
