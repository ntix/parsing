import { parseChain } from '../parseChain';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMax } from '../provideMax';
import { provideMin } from '../provideMin';
import { provideRange } from '../provideRange';
import { ensureNumberArray } from './ensureNumberArray';
import { provideParseInt } from './provideParseInt';
import { parseInt } from './parseInt';
/**
 * Fluent builder for parsing ints
 */
export class IntParser {
    constructor(parent, parseCurrent = provideParseInt(), radix = undefined, negate = false) {
        this.parent = parent;
        this.parseCurrent = parseCurrent;
        this.radix = radix;
        this.negate = negate;
        this.parse = parseChain(this.parent, this.parseCurrent);
        this.withRadix = (value) => new IntParser(this.parent, this.parseCurrent, value, this.negate);
        this.equals = (value) => new IntParser(this, provideEquals(parseInt(value, this.radix), this.negate));
        this.anyOf = (values) => new IntParser(this, provideAnyOf(ensureNumberArray(values), this.negate));
        this.min = (value, exclusive = false) => new IntParser(this, provideMin(parseInt(value, this.radix), exclusive, this.negate));
        this.max = (value, exclusive = false) => new IntParser(this, provideMax(parseInt(value, this.radix), exclusive, this.negate));
        this.range = (min, max, exclusive = false) => new IntParser(this, provideRange(parseInt(min, this.radix), parseInt(max, this.radix), exclusive, this.negate));
    }
    get not() {
        return new IntParser(this.parent, this.parseCurrent, this.radix, true);
    }
}
