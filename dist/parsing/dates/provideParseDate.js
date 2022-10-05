import { isDateType, isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
import { tryParseDate } from './tryParseDate';
export function provideParseDate() {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        if (isDateType(value))
            return createParseResult(value);
        const dateValue = tryParseDate(value);
        return dateValue === null
            ? createParseResult(null, ParseErrors.date)
            : createParseResult(dateValue);
    };
}
