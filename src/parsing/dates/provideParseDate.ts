import { isDateType, isNullOrUndefined } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { DateParsableTypes } from './DateParsableTypes';
import { tryParseDate } from './tryParseDate';

export function provideParseDate() {
  return (value: unknown): IParseResult<Date> => {
    if (isNullOrUndefined(value))
      return createParseResult(value);
    if (value === '')
      return createParseResult(null);

    if (isDateType(value)) return createParseResult(value);

    const dateValue = tryParseDate(value as DateParsableTypes);
    return dateValue == null
      ? createParseResult(dateValue, ParseErrors.date)
      : createParseResult(dateValue);
  };
}
