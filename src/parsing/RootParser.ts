import { isNullOrEmpty } from '../predicates';
import { ArrayParser, IArray } from './arrays';
import { BooleanParser, IBoolean } from './booleans';
import { createParseResult } from './createParseResult';
import { DateParser, IDate } from './dates';
import { IParser } from './IParser';
import { IRoot } from './IRoot';
import { FloatParser, IFloat, IInt, IntParser } from './numbers';
import { ComplexParser, ComplexSchema, IComplex } from './complex';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';
import { IString, StringParser } from './strings';

export class RootParser implements IRoot.Parser {
  constructor(
    private isRequried = false
  ) { }

  readonly parse = parseChain(null, value =>
    this.isRequried && isNullOrEmpty(value)
      ? createParseResult(value, ParseErrors.required)
      : createParseResult(value));

  readonly boolean: IBoolean.Parser = new BooleanParser(this);
  readonly int: IInt.Parser = new IntParser(this);
  readonly float: IFloat.Parser = new FloatParser(this);
  readonly date: IDate.Parser = new DateParser(this);
  readonly string: IString.Parser = new StringParser(this);
  readonly array: IArray.Parser = new ArrayParser(this);

  readonly for = <T>(schema: ComplexSchema<T>): IComplex.Parser<T> => new ComplexParser(this, schema);
  readonly use = <T>(parser: IParser<T>) => ({ parse: parseChain<T>(this, parser.parse) });
}
