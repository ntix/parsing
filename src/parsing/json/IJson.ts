import { ICurrentParser } from '../ICurrentParser';
import { IParser } from '../IParser';
import { ComplexSchema, IComplex } from '../complex';

/** Fluent API interfaces for JSON */
export namespace IJson {

    export interface Parser<T = unknown> extends IParser<T> {

        // use a complex type schema to parse the json object 
        readonly for: <U>(schema: ComplexSchema<U>) => IComplex.Parser<U>;
        /** use a parser function to parse the json object */
        readonly use: <U>(parser: ICurrentParser<U>) => IParser<U>;
    }
}
