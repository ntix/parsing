import { ParseErrors } from '../ParseErrors';
import { tryParseJson } from './tryParseJson';
import { IParse } from '../IParse';
import { isNullOrEmpty } from '../../predicates';

export function provideParseJson<T>(
): IParse<T> {

  return (value: string) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      parsed = tryParseJson<T>(value);
      success = parsed !== null;
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.json
    };
  };
}
