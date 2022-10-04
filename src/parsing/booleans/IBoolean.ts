import { IParser } from '../IParser';

/** Fluent API interfaces for booleans */
export namespace IBoolean {
  export interface Parser extends IParser<boolean>, Builder {
    readonly not: Builder
  }

  export interface Builder {
    equals(value: boolean): EqualsParser
  }

  export interface EqualsParser extends IParser<boolean> { }
}
