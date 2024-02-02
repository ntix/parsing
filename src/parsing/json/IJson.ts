import { IParser } from '../IParser';
import { ComplexSchema, IComplex } from '../complex';

/** Fluent API interfaces for JSON */
export namespace IJson {

    export interface Parser<T = unknown> extends IParser<T> {

        readonly for: <U>(schema: ComplexSchema<U>) => IComplex.Parser<U>;
        readonly use: <U>(parser: IParser<U>) => IParser<U>;
    }
}
