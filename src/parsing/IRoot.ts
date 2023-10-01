import { IBoolean } from './booleans';
import { IDate } from './dates';
import { IParser } from './IParser';
import { IFloat, IInt } from './numbers';
import { ComplexSchema, IComplex } from './complex';
import { IString } from './strings';
import { IArray } from './arrays';
import { IDictionary } from './dictionaries';
import { IJson } from './json/IJson';

export namespace IRoot {

  export interface Parser extends IParser<unknown>, Builder { }

  export interface Builder {
    readonly boolean: IBoolean.Parser;
    readonly int: IInt.Parser;
    readonly float: IFloat.Parser;
    readonly date: IDate.Parser;
    readonly string: IString.Parser;
    readonly array: IArray.Parser;
    readonly dictionary: IDictionary.Parser;
    readonly json: IJson.Parser;

    readonly for: <T>(schema: ComplexSchema<T>) => IComplex.Parser<T>;
    readonly use: <T>(parser: IParser<T>) => IParser<T>;
  }
}
