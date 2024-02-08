import { isNullOrEmpty } from '../../predicates';
import { isObject } from '../../predicates/isObject';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';
import { Dictionary } from './Dictionary';

export function provideParseDictionary<T>(
): IParse<Dictionary<T>> {

  return (value: unknown) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      success = isObject(value);
      if (success)
        parsed = value as Dictionary<T>;
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.dictionary
    };
  };
}
