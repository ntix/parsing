import { isNullOrEmpty } from '../../predicates';
import { IParse } from '../IParse';
import { ParseErrors } from '../ParseErrors';
import { DateParsableTypes } from './DateParsableTypes';
import { tryParseDate } from './tryParseDate';

export function provideParseDate(
): IParse<Date> {

  return (value: DateParsableTypes) => {
    let success = true;
    let parsed = null;

    if (!isNullOrEmpty(value)) {

      parsed = tryParseDate(value);
      success = parsed !== null;
    }

    return {
      value: parsed,
      success,
      errors: ParseErrors.date
    };
  };
}
