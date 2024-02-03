import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { IParseResult } from '../IParseResult';
import { ParseErrors } from '../ParseErrors';
import { DateParsableTypes } from './DateParsableTypes';
import { tryParseDate } from './tryParseDate';

export function provideParseDate(negate: boolean = false) {

  return (value: unknown): IParseResult<Date> => {
    if (isNullOrEmpty(value)) return createParseResult(null);

    const parsed = tryParseDate(value as DateParsableTypes);

    if (parsed === null === negate)
      return createParseResult(parsed);

    const errors = negate
      ? ParseErrors.not(ParseErrors.date)
      : ParseErrors.date;

    return createParseResult(null, errors);
  };
}
