import { provideEquals } from '../provideEquals';
import { parseChain } from '../parseChain';
import { provideParseBoolean } from './provideParseBoolean';
/**
 * Fluent builder for parsing booleans
 */
export class BooleanParser {
    constructor(parent, parseCurrent = provideParseBoolean(), negate = false) {
        this.parent = parent;
        this.parseCurrent = parseCurrent;
        this.negate = negate;
        this.parse = parseChain(this.parent, this.parseCurrent);
        this.equals = (equalToValue) => new BooleanParser(this, provideEquals(equalToValue, this.negate));
    }
    get not() {
        return new BooleanParser(this.parent, provideParseBoolean(), true);
    }
}
