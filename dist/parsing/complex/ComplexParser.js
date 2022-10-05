import { isEqual, isNullOrEmpty } from '../../predicates';
import { createParseResult } from '../createParseResult';
import { parseChain } from '../parseChain';
import { ParseErrors } from '../ParseErrors';
export class ComplexParser {
    constructor(parent, schema) {
        this.parent = parent;
        this.schema = schema;
        this.parse = parseChain(this.parent, (originalValue) => {
            if (isNullOrEmpty(originalValue))
                return createParseResult(null);
            return Object
                .keys(this.schema)
                .reduce((r, key) => {
                const result = this.schema[key].parse(originalValue[key]);
                const value = result.value == null
                    ? r.value
                    : Object.assign(Object.assign({}, r.value), { [key]: result.value });
                const errors = isEqual(result.errors, ParseErrors.empty)
                    ? r.errors
                    : Object.assign(Object.assign({}, r.errors), { [key]: result.errors });
                return createParseResult(value, errors);
            }, createParseResult(originalValue));
        });
    }
}
