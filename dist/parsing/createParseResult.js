import { isEqual } from '../predicates';
import { ParseErrors } from './ParseErrors';
export function createParseResult(value, errors = ParseErrors.empty) {
    const success = isEqual(errors, ParseErrors.empty);
    return {
        value,
        success,
        errors: success ? ParseErrors.empty : errors // for quick check
    };
}
