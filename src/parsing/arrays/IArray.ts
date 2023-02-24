import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for arrays */
export namespace IArray {

  export interface Parser<T = unknown> extends IParser<T[]> {
    /** negate the parser */
    readonly not: NextBuilder<Parser<T>, 'of' | 'each' | 'not'>

    /** type the array */
    readonly of: <U>() => NextBuilder<Parser<U>, 'of' | 'each', 'unique'>
    /** parse each item in the array */
    readonly each: <U = T>(parser: IParser<U>) => NextBuilder<Parser<U>, 'of' | 'each'>

    /** items a are unique by function */
    readonly unique: (distinctor: (item: T) => unknown) => NextBuilder<Parser<T>, 'of' | 'each' | 'unique'>;
    /** length is greater or equal to passed value */
    readonly minLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of' | 'each'| 'minLength'>;
    /** length is less or equal to passed value */
    readonly maxLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of' | 'each' | 'maxLength'>;
  }
}
