import { IParser } from '../IParser';
/** Fluent API interfaces for booleans */
export declare namespace IBoolean {
    export interface Parser extends IParser<boolean>, Builder {
        readonly not: Builder;
    }
    interface Builder {
        equals(value: boolean): IParser<boolean>;
    }
    export {};
}
