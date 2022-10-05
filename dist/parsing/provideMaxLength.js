import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
export function provideMaxLength(maxLength, exclusive, negate) {
    return (value) => {
        if (isNullOrEmpty(value)
            || (exclusive ? value.length < maxLength : value.length <= maxLength) !== negate)
            return createParseResult(value);
        let errors = ParseErrors.maxLength(maxLength);
        if (negate)
            errors = ParseErrors.not(errors);
        return createParseResult(value, errors);
    };
}
