import { createParseResult } from '../createParseResult';
import { IParse } from '../IParse';
import { IParseResult } from '../IParseResult';

/**
 * parse all elements of an array
 *
 * @param parse function
 * @returns IParseResult<T[]>
 */
export function parseAllArray<T>(
  parse: IParse<T>
) {

  return (values: unknown[]) => {
    if (values == null) return createParseResult(null);

    return values.reduce<IParseResult<T[]>>(
      (r, value, index) => {

        const result = parse(value);
        const errors = result.success
          ? r.errors
          : { ...r.errors, [index]: result.errors };

        return createParseResult(
          [...r.value, result.value],
          errors
        );

      }, createParseResult([])
    );
  };
}
