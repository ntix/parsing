import { isNullOrEmpty } from '../predicates';
import { ArrayParser } from './arrays';
import { BooleanParser } from './booleans';
import { createParseResult } from './createParseResult';
import { DateParser } from './dates';
import { FloatParser, IntParser } from './numbers';
import { ComplexParser } from './complex';
import { parseChain } from './parseChain';
import { ParseErrors } from './ParseErrors';
import { StringParser } from './strings';
export class RootParser {
    constructor(isRequried = false) {
        this.isRequried = isRequried;
        this.parse = parseChain(null, value => this.isRequried && isNullOrEmpty(value)
            ? createParseResult(value, ParseErrors.required)
            : createParseResult(value));
        this.boolean = new BooleanParser(this);
        this.int = new IntParser(this);
        this.float = new FloatParser(this);
        this.date = new DateParser(this);
        this.string = new StringParser(this);
        this.array = new ArrayParser(this);
        this.for = (schema) => new ComplexParser(this, schema);
        this.use = (parser) => ({ parse: parseChain(this, parser.parse) });
    }
}
