import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { IParseErrors } from '../IParseErrors';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { createParseResult } from '../createParseResult';
import { Dictionary } from './Dictionary';

/**
 * parse all properties on an object (Dictionary)
 *
 * @param parse function
 * @returns IParseResult<Dictionary<T>>
 */
export function provideParseDictionaryValues<T>(
  parse: IParse<T>
): IParse<Dictionary<T>> {

  return (value: unknown) => {
    let success = true;
    let errors: IParseErrors = ParseErrors.dictionary;

    if (!isNullOrEmpty(value)) {

      const result = Object
        .keys(value)
        .reduce<IParseResult<Dictionary<T>>>(
          (ar, n) => {

            const r = parse(value[n]);
            const e = r.success
              ? ar.errors
              : { ...ar.errors, [n]: r.errors };

            return createParseResult(
              { ...ar.value, [n]: r.value },
              e
            );

          }, createParseResult<Dictionary<T>>({})
        );

      value = result.value;
      success = result.success;
      if (!success) errors = result.errors;
    }

    return {
      value: value as Dictionary<T>,
      success,
      errors: errors
    };
  };
}
