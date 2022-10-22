import { createParseResult } from '../createParseResult';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

/**
 * provides a uniqueness check on array
 *
 * @param distinctor property selector which marks uniqueness
 * @param negate negate result
 * @returns
 */
export function provideUniqueArray<T>(distinctor: (t: T) => unknown, negate: boolean): IParse<T[]> {
  return (values: T[]) => {

    const index = new Set();
    const hasDuplicates = values.some(v => {
      const key = distinctor(v);
      const exists = index.has(key);
      index.add(key);

      return exists;
    });

    return createParseResult(values,
      hasDuplicates !== negate
        ? negate ? ParseErrors.not(ParseErrors.unique) : ParseErrors.unique
        : ParseErrors.empty);
  };
}
