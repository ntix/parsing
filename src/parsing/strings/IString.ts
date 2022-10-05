import { IParser } from '../IParser';
import { RemoveFromBuilder } from '../RemoveFromBuilder';

/** Fluent API interfaces for strings */
export namespace IString {

  export interface Parser extends IParser<string>, Builder {
    readonly not: Builder;
  }

  interface Builder extends Common {
    equals(value: string, ignoreCase?: boolean): IParser<string>;
    anyOf(values: string[], ignoreCase?: boolean): IParser<string>;
  }

  interface Common extends IParser<string> {
    minLength(value: number, exclusive?: boolean): RemoveFromBuilder<Common, 'minLength' | 'maxLength' | 'rangeLength'>;
    maxLength(value: number, exclusive?: boolean): RemoveFromBuilder<Common, 'minLength' | 'maxLength' | 'rangeLength'>;
    rangeLength(min: number, max: number, exclusive?: boolean): RemoveFromBuilder<Common, 'minLength' | 'maxLength' | 'rangeLength'>;
    matches(value: string | RegExp, name?: string): RemoveFromBuilder<Common, 'matches' | 'includes' | 'startsWith' | 'endsWith'>;
    includes(value: string, ignoreCase?: boolean): RemoveFromBuilder<Common, 'includes' | 'matches'>;
    startsWith(value: string, ignoreCase?: boolean): RemoveFromBuilder<Common, 'startsWith' | 'matches'>;
    endsWith(value: string, ignoreCase?: boolean): RemoveFromBuilder<Common, 'endsWith' | 'matches'>;
  }
}
