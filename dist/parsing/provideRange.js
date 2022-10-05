import { isNullOrEmpty } from '../predicates';
import { createParseResult } from './createParseResult';
import { ParseErrors } from './ParseErrors';
/**
 * Validate a value is a minimum
 */
export function provideRange(minValue, maxValue, exclusive, negate) {
    return (value) => {
        if (isNullOrEmpty(value)
            || ((exclusive ? value > minValue : value >= minValue)
                && (exclusive ? value < maxValue : value <= maxValue)) !== negate)
            return createParseResult(value);
        let errors = ParseErrors.range(minValue, maxValue, exclusive);
        if (negate)
            errors = ParseErrors.not(errors);
        return createParseResult(value, errors);
    };
}
