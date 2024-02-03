import { IParser } from '../IParser';
import { NextBuilder } from '../NextBuilder';

/** Fluent API interfaces for arrays */
export namespace IArray {

  export interface Parser<T = unknown> extends IParser<T[]> {
    readonly not: NextBuilder<Parser<T>, 'not' | 'of' | 'each'>

    readonly of: <U>() => NextBuilder<Parser<U>, 'of' | 'each', 'unique' | 'not' | 'parse'>
    readonly each: <U = T>(parser: IParser<U>) => NextBuilder<Parser<U>, 'of' | 'each', 'unique' | 'not' | 'parse'>

    readonly unique: (distinctor: (item: T) => unknown) => NextBuilder<Parser<T>, 'of' | 'each' | 'unique', 'not' | 'parse'>;
    readonly minLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of' | 'each' | 'minLength', 'not' | 'parse'>;
    readonly maxLength: (value: number, exclusive?: boolean) => NextBuilder<Parser<T>, 'of' | 'each' | 'maxLength', 'not' | 'parse'>;
  }
}
