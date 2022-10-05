import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
export function provideRangeLength(minLength, maxLength, exclusive, negate) {
    return (value) => {
        if (isNullOrEmpty(value)
            || ((exclusive ? value.length > minLength : value.length >= minLength)
                && (exclusive ? value.length < maxLength : value.length <= maxLength)) !== negate)
            return createParseResult(value);
        let errors = ParseErrors.rangeLength(minLength, maxLength, exclusive);
        if (negate)
            errors = ParseErrors.not(errors);
        return createParseResult(value, errors);
    };
}
