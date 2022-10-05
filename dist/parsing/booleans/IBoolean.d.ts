import { IParser } from '../IParser';
/** Fluent API interfaces for booleans */
export declare namespace IBoolean {
    interface Parser extends IParser<boolean>, Builder {
        readonly not: Builder;
    }
    interface Builder {
        equals(value: boolean): EqualsParser;
    }
    interface EqualsParser extends IParser<boolean> {
    }
}
