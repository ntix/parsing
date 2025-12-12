import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { IParseErrors } from '../IParseErrors';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';

/**
 * parse all elements of an array
 *
 * @param parse function
 * @returns parser
 */
export function provideParseArrayValues<T>(
  parse: IParse<T>
): IParse<T[]> {

  return (value: unknown[]) => {
    let success = true;
    let errors: IParseErrors = ParseErrors.array;

    if (!isNullOrEmpty(value)) {

      const result = value.reduce<IParseResult<T[]>>(
        (ar, v, i) => {

          const r = parse(v);
          const e = r.success
            ? ar.errors
            : { ...ar.errors, [i]: r.errors };

          return createParseResult(
            [...ar.value, r.value],
            e
          );

        }, createParseResult([])
      );

      value = result.value;
      success = result.success;
      if (!success) errors = result.errors;
    }

    return {
      value: value as T[],
      success,
      errors: errors
    };
  };
}
