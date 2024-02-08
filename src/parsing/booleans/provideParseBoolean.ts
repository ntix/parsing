import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';
import { tryParseBoolean } from './tryParseBoolean';

export function provideParseBoolean(
): IParse<boolean> {
  return (value: unknown) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      parsed = tryParseBoolean(value);
      success = parsed !== null;
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.boolean
    };
  };
}
