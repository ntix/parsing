import { IParser } from '../IParser';
import { RemoveFromBuilder } from '../RemoveFromBuilder';

/** Fluent API interfaces for strings */
export namespace IString {

  export interface Parser extends IParser<string>, Builder {
    readonly not: Builder;
  }

  interface Builder extends Common {
    equals(value: string): IParser<string>;
    anyOf(values: string[]): IParser<string>;
  }

  interface Common extends IParser<string> {
    minLength(value: number, exclusive?: boolean): RemoveFromBuilder<Common, 'minLength' | 'maxLength' | 'rangeLength'>;
    maxLength(value: number, exclusive?: boolean): RemoveFromBuilder<Common, 'minLength' | 'maxLength' | 'rangeLength'>;
    rangeLength(min: number, max: number, exclusive?: boolean): RemoveFromBuilder<Common, 'minLength' | 'maxLength' | 'rangeLength'>;
    includes(value: string, caseSensitive?: boolean): RemoveFromBuilder<Common, 'includes'>;
    startsWith(value: string, caseSensitive?: boolean): RemoveFromBuilder<Common, 'startsWith'>;
    endsWith(value: string, caseSensitive?: boolean): RemoveFromBuilder<Common, 'endsWith'>;
  }
}
