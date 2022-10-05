import { IParser } from '../IParser';
import { IComplex } from './IComplex';
import { ComplexSchema } from './ComplexSchema';
export declare class ComplexParser<T> implements IComplex.Parser<T> {
    private parent;
    private schema;
    constructor(parent: IParser<unknown>, schema: ComplexSchema<T>);
    readonly parse: import("..").IParse<any>;
}
