import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';

/**
 * provides a parser for an array, or not an array
 * 
 * note. if negated result value will be null 
 * 
 * @returns parser
 */
export function provideParseArray<T>(
): IParse<T[]> {

  return (value: unknown) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      success = Array.isArray(value);
      if (success)
        parsed = value as T[];
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.array
    };
  };
}
