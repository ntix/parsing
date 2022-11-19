import { IBoolean } from './booleans';
import { IDate } from './dates';
import { IParser } from './IParser';
import { IFloat, IInt } from './numbers';
import { ComplexSchema, IComplex } from './complex';
import { IString } from './strings';
import { IArray } from './arrays';

export namespace IRoot {

  export interface Parser extends IParser<unknown> {

    /** parse a boolean */
    readonly boolean: IBoolean.Parser;
    /** parse a number (int) */
    readonly int: IInt.Parser;
    /** parse a number (floa) */
    readonly float: IFloat.Parser;
    /** parse a date */
    readonly date: IDate.Parser;
    /** parse a string */
    readonly string: IString.Parser;
    /** parse an array */
    readonly array: IArray.Parser;

    /** parse a complex object */
    readonly for: <T>(schema: ComplexSchema<T>) => IComplex.Parser<T>
    /** parse with a function */
    readonly use: <T>(parser: IParser<T>) => IParser<T>
  }
}
