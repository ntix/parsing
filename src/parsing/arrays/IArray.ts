import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for arrays */
export namespace IArray {

  export interface Parser<T = unknown> extends IParser<T[]> {
    readonly not: NextBuilder<Parser<T>, 'of' | 'each' | 'not'>

    readonly of: <U>() => NextBuilder<Parser<U>, 'of' | 'each', 'unique'>
    readonly each: <U = T>(parser: IParser<U>) => NextBuilder<Parser<U>, 'of' | 'each'>

    readonly unique: (distinctor: (item: T) => unknown) => NextBuilder<Parser<T>, 'of' | 'each' | 'unique'>;
    readonly minLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of'  | 'each'| 'minLength'>;
    readonly maxLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of' | 'each' | 'maxLength'>;

  }
}
