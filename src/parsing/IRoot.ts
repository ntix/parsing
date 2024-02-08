import { IBoolean } from './booleans';
import { IDate } from './dates';
import { IParser } from './IParser';
import { IFloat, IInt } from './numbers';
import { ComplexSchema, IComplex } from './complex';
import { IString } from './strings';
import { IDictionary } from './dictionaries';
import { IJson } from './json/IJson';
import { NextBuilder } from './NextBuilder';
import { IArray } from './arrays';

export namespace IRoot {

  export interface Parser extends IParser<unknown> {
    readonly not: NextBuilder<Parser, 'not' | 'parse'>;
    readonly required: NextBuilder<Parser, 'required'>

    readonly boolean: IBoolean.Parser;
    readonly int: IInt.Parser;
    readonly float: IFloat.Parser;
    readonly date: IDate.Parser;
    readonly string: IString.Parser;
    readonly json: IJson.Parser;
    readonly array: NextBuilder<IArray.Parser, never, 'of'>;
    readonly dictionary: IDictionary.Parser;

    /** get a complex schema  */
    readonly for: <T>(schema: ComplexSchema<T>) => IComplex.Parser<T>;
    /** use a parser function to parse the value */
    readonly use: <T>(parser: IParser<T>) => IParser<T>;
  }
}
