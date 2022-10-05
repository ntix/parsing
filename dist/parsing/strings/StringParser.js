import { parseChain } from '../parseChain';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { provideRangeLength } from '../provideRangeLength';
import { provideEndsWithString } from './provideEndsWithString';
import { provideParseString } from './provideParseString';
import { provideIncludesString } from './provideIncludesString';
import { provideStartsWithString } from './provideStartsWithString';
import { provideMatchesString } from './provideMatchesString';
import { provideEqualsString } from './provideEqualsString';
import { provideAnyOfString } from './provideAnyOfString';
/**
 * Fluent builder for parsing strings
 */
export class StringParser {
    constructor(parent, parseCurrent = provideParseString(), negate = false) {
        this.parent = parent;
        this.parseCurrent = parseCurrent;
        this.negate = negate;
        this.parse = parseChain(this.parent, this.parseCurrent);
        this.equals = (value, ignoreCase = false) => new StringParser(this, provideEqualsString(value, ignoreCase, this.negate));
        this.anyOf = (values, ignoreCase = false) => new StringParser(this, provideAnyOfString(values, ignoreCase, this.negate));
        this.minLength = (value, exclusive = false) => new StringParser(this, provideMinLength(value, exclusive, this.negate));
        this.maxLength = (value, exclusive = false) => new StringParser(this, provideMaxLength(value, exclusive, this.negate));
        this.rangeLength = (min, max, exclusive = false) => new StringParser(this, provideRangeLength(min, max, exclusive, this.negate));
        this.matches = (value, name = null) => new StringParser(this, provideMatchesString(value, name, this.negate));
        this.includes = (value, ignoreCase = false) => new StringParser(this, provideIncludesString(value, ignoreCase, this.negate));
        this.startsWith = (value, ignoreCase = false) => new StringParser(this, provideStartsWithString(value, ignoreCase, this.negate));
        this.endsWith = (value, ignoreCase = false) => new StringParser(this, provideEndsWithString(value, ignoreCase, this.negate));
    }
    get not() {
        return new StringParser(this.parent, this.parseCurrent, true);
    }
}
