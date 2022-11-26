import { isNullOrEmpty } from '../predicates';
import { ArrayParser, IArray } from './arrays';
import { BooleanParser, IBoolean } from './booleans';
import { createParseResult } from './createParseResult';
import { DateParser, IDate } from './dates';
import { IParser } from './IParser';
import { IRoot } from './IRoot';
import { FloatParser, IFloat, IInt, IntParser } from './numbers';
import { ObjectParser, ObjectSchema, IObject } from './object';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';
import { IString, StringParser } from './strings';
import { ParseErrorCallback } from './ParseErrorCallback';

/**
 * Root Parser
 */
export class RootParser implements IRoot.Parser {
  constructor(
    private isDefined = false,
    private isRequried = false
  ) { }

  readonly parse = parseChain(null, value => {
    if (this.isDefined && value === undefined)
      return createParseResult(value, ParseErrors.defined);

    if (this.isRequried && isNullOrEmpty(value))
      return createParseResult(value, ParseErrors.required)

    return createParseResult(value);
  });

  readonly boolean: IBoolean.Parser = new BooleanParser(this);
  readonly int: IInt.Parser = new IntParser(this);
  readonly float: IFloat.Parser = new FloatParser(this);
  readonly date: IDate.Parser = new DateParser(this);
  readonly string: IString.Parser = new StringParser(this);
  readonly array: IArray.Parser = new ArrayParser(this);

  readonly object = <T>(schema: ObjectSchema<T>): IObject.Parser<T> => new ObjectParser(this, schema);
  readonly use = <T>(parser: IParser<T>, onError?: ParseErrorCallback) => ({ parse: parseChain<T>(this, parser.parse, onError) });
}
