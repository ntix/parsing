import { IParser } from '../IParser';
import { ComplexSchema, IComplex } from '../complex';

/** Fluent API interfaces for JSON */
export namespace IJson {

    export interface Parser<T = unknown> extends IParser<T> {

        readonly for: <T>(schema: ComplexSchema<T>) => IComplex.Parser<T>;
        readonly use: <T>(parser: IParser<T>) => IParser<T>;
    }
}
