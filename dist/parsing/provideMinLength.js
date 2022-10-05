import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
export function provideMinLength(minLength, exclusive, negate) {
    return (value) => {
        if (isNullOrEmpty(value)
            || (exclusive ? value.length > minLength : value.length >= minLength) !== negate)
            return createParseResult(value);
        let errors = ParseErrors.minLength(minLength);
        if (negate)
            errors = ParseErrors.not(errors);
        return createParseResult(value, errors);
    };
}
