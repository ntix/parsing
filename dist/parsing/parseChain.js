import { createParseResult } from './createParseResult';
export function parseChain(parent, current) {
    return (value) => {
        if (parent == null) {
            // when root Schema
            return current(value);
        }
        const parentResult = parent.parse(value);
        const result = current(parentResult.value);
        return createParseResult(result.value, Object.assign(Object.assign({}, parentResult.errors), result.errors));
    };
}
