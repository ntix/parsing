import { parseAll } from '../parseAll';
import { parseChain } from '../parseChain';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { provideRangeLength } from '../provideRangeLength';
import { provideParseArray } from './provideParseArray';
export class ArrayParser {
    constructor(parent, parseCurrent = provideParseArray(), negate = false) {
        this.parent = parent;
        this.parseCurrent = parseCurrent;
        this.negate = negate;
        this.parse = parseChain(this.parent, this.parseCurrent);
        this.minLength = (minValue, exclusive = false) => new ArrayParser(this, provideMinLength(minValue, exclusive, this.negate));
        this.maxLength = (maxValue, exclusive = false) => new ArrayParser(this, provideMaxLength(maxValue, exclusive, this.negate));
        this.rangeLength = (minValue, maxValue, exclusive = false) => new ArrayParser(this, provideRangeLength(minValue, maxValue, exclusive, this.negate));
        this.each = (parser) => ({ parse: parseChain(this, parseAll(parser.parse)) });
    }
    get not() {
        return new ArrayParser(this.parent, this.parseCurrent, true);
    }
}
