import { createParseResult } from './createParseResult';
/**
 * parse all elements of an array
 *
 * @param parse function
 * @returns IParseResult<T[]>
 */
export function parseAll(parse) {
    return (values) => {
        if (values == null)
            return createParseResult(null);
        return values.reduce((r, value, index) => {
            const result = parse(value);
            const errors = result.success
                ? r.errors
                : Object.assign(Object.assign({}, r.errors), { [index]: result.errors });
            return createParseResult([...r.value, result.value], errors);
        }, createParseResult([]));
    };
}
