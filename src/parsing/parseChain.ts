import { IParser } from './IParser';
import { createParseResult } from './createParseResult';
import { IParse } from './IParse';

export function parseChain<T>(
  parent: IParser<unknown>, current: IParse<T>
): IParse<T> {

  return (value: unknown) => {
    if (parent == null) {
      // when root Schema
      return current(value);
    }

    const parentResult = parent.parse(value);
    const result = current(parentResult.value);

    return createParseResult(result.value, {
      ...parentResult.errors,
      ...result.errors
    });
  };
}
