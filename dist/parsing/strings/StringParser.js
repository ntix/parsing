import { parseChain } from '../parseChain';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { provideRangeLength } from '../provideRangeLength';
import { provideParseString } from './provideParseString';
/**
 * Fluent builder for parsing strings
 */
export class StringParser {
    constructor(parent, parseCurrent = provideParseString(), negate = false) {
        this.parent = parent;
        this.parseCurrent = parseCurrent;
        this.negate = negate;
        this.parse = parseChain(this.parent, this.parseCurrent);
        this.equals = (value) => new StringParser(this, provideEquals(value, this.negate));
        this.anyOf = (values) => new StringParser(this, provideAnyOf(values, this.negate));
        this.minLength = (value, exclusive = false) => new StringParser(this, provideMinLength(value, exclusive, this.negate));
        this.maxLength = (value, exclusive = false) => new StringParser(this, provideMaxLength(value, exclusive, this.negate));
        this.rangeLength = (min, max, exclusive = false) => new StringParser(this, provideRangeLength(min, max, exclusive, this.negate));
    }
    get not() {
        return new StringParser(this.parent, this.parseCurrent, true);
    }
}
