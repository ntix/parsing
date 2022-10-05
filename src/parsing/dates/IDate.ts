import { IParser } from '../IParser';
import { RemoveFromBuilder } from '../RemoveFromBuilder';
import { DateParsableTypes } from './DateParsableTypes';

/** Fluent API interfaces for dates */
export namespace IDate {
  export interface Parser extends Builder {
    readonly not: Builder
  }

  interface Builder extends Common {
    equals(value: DateParsableTypes): IParser<Date>;
    anyOf(values: DateParsableTypes[]): IParser<Date>;
  }

  interface Common extends IParser<Date> {
    min(value: DateParsableTypes, exclusive?: boolean): RemoveFromBuilder<Common, 'min' | 'max' | 'range'>;
    max(value: DateParsableTypes, exclusive?: boolean): RemoveFromBuilder<Common, 'min' | 'max' | 'range'>;
    range(min: DateParsableTypes, max: DateParsableTypes, exclusive?: boolean): RemoveFromBuilder<Common, 'min' | 'max' | 'range'>;
  }
}
