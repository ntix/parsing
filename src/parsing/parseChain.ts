import { IParser } from './IParser';
import { createParseResult } from './createParseResult';
import { IParse } from './IParse';
import { ParseErrorCallback } from './ParseErrorCallback';

export function parseChain<T>(
  parent: IParser<unknown>, current: IParse<T>,
  onError?: ParseErrorCallback
): IParse<T> {

  return (value: unknown) => {
    if (parent == null) {
      // when root Schema
      return current(value);
    }

    const parentResult = parent.parse(value);
    const result = current(parentResult.value);

    onError = onError || (errors => errors);

    return createParseResult(result.value, {
      ...parentResult.errors,
      ...onError(result.errors)
    });
  };
}
