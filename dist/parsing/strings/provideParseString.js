import { isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
export function provideParseString() {
    return (value) => {
        if (isNullOrEmpty(value))
            return createParseResult(null);
        return createParseResult(value.toString());
    };
}
