import { IParser } from './IParser';
import { IParseResult } from './IParseResult';
import { createParseResult } from './createParseResult';

export function parseChain<T>(parent: IParser<T>, current: (value: T) => IParseResult<T>) {
  return (value: any) => {
    if (parent == null)
      // when root Schema
      return current(value);

    const parentResult = parent.parse(value);
    const result = current(parentResult.value);

    return createParseResult(result.value, {
      ...parentResult.errors,
      ...result.errors,
    });
  };
}
