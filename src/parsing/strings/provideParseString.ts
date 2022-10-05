import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';

export function provideParseString() {
  return (value: unknown): IParseResult<string> => {
    if (isNullOrEmpty(value))
      return createParseResult(null);

    return createParseResult(value.toString());
  };
}
