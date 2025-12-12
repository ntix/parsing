import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

/**
 * provides a uniqueness check on array
 *
 * @param distinctor property selector which marks uniqueness
 * @returns parser
 */
export function provideParseUniqueArray<T>(
  distinctor: (t: T) => unknown
): IParse<T[]> {

  return (values: T[]) => {

    return {
      value: values,
      success: isNullOrEmpty(values) || (() => {

        const index = new Set();
        return !values.some(v => {
          const key = distinctor(v);
          const exists = index.has(key);
          index.add(key);

          return exists;
        });

      })(),
      errors: ParseErrors.unique
    };
  };
}
