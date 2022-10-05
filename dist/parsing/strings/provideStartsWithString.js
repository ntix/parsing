import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { ParseErrors } from '../ParseErrors';
export function provideStartsWithString(startswithValue, ignoreCase, negate) {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        const a = ignoreCase ? value.toLowerCase() : value;
        const b = ignoreCase ? startswithValue.toLowerCase() : startswithValue;
        if (a.startsWith(b) !== negate)
            return createParseResult(value);
        return createParseResult(value, ParseErrors.startsWith(value, ignoreCase));
    };
}
