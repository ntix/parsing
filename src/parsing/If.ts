import { IParser } from './IParser';
import { createParseResult } from './createParseResult';

/**
 * Conditional 'If' parser
 *
 * @param predicate receives the parent value to test
 * @param thenParser parser when the predicate passes
 * @param elseParser parser when the predicate fails (not required)
 * @returns parser
 */
export function If<P, T>(
  predicate: (value: P) => boolean,
  thenParser: IParser<T>,
  elseParser?: IParser<T>
): IParser<T, P> {

  return {
    parse: (value: T, parentValue: P) => {

      return predicate(parentValue)
        ? thenParser.parse(value)
        : elseParser
          ? elseParser.parse(value)
          : createParseResult(value);
    }
  };
}
