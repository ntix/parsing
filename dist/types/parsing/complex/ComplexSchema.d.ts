import { IParser } from '../IParser';
export declare type ComplexSchema<T> = {
    [k in keyof T]: IParser<T[k]>;
};
