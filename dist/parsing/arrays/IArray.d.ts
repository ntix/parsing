import { IParser } from '../IParser';
import { RemoveFromBuilder } from '../RemoveFromBuilder';
/** Fluent API interfaces for arrays */
export declare namespace IArray {
    export interface Parser extends BuilderParser {
        readonly not: Builder;
    }
    interface Builder {
        readonly minLength: (value: number, exclusive?: boolean) => RemoveFromBuilder<BuilderParser, 'minLength' | 'maxLength' | 'rangeLength'>;
        readonly maxLength: (value: number, exclusive?: boolean) => RemoveFromBuilder<BuilderParser, 'minLength' | 'maxLength' | 'rangeLength'>;
        readonly rangeLength: (min: number, max: number, exclusive?: boolean) => RemoveFromBuilder<BuilderParser, 'minLength' | 'maxLength' | 'rangeLength'>;
    }
    interface BuilderParser extends IParser<unknown[]>, Builder {
        readonly each: <T>(parser: IParser<T>) => IParser<T[]>;
    }
    export {};
}
