import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
/**
 * Validate a value is a minimum
 */
export function provideMin(minValue, exclusive, negate) {
    return (value) => {
        if (isNullOrEmpty(value)
            || (exclusive ? value > minValue : value >= minValue) !== negate)
            return createParseResult(value);
        let errors = ParseErrors.min(minValue, exclusive);
        if (negate)
            errors = ParseErrors.not(errors);
        return createParseResult(value, errors);
    };
}
