import { IParser } from './IParser';
import { createParseResult } from './createParseResult';

export function provideIfParser<P, T>(
  predicate: (value: P) => boolean,
  trueAction: IParser<T>,
  falseAction?: IParser<T>
): IParser<T, P> {

  return {
    parse: (value: T, parentValue: P) => {

      return predicate(parentValue)
        ? trueAction.parse(value)
        : falseAction
          ? falseAction.parse(value)
          : createParseResult(value);
    }
  };
}
