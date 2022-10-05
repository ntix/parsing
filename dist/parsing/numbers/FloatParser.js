import { parseChain } from '../parseChain';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMax } from '../provideMax';
import { provideMin } from '../provideMin';
import { provideRange } from '../provideRange';
import { ensureNumberArray } from './ensureNumberArray';
import { parseFloat } from './parseFloat';
import { provideParseFloat } from './provideParseFloat';
/**
 * Fluent builder for parsing floats
 */
export class FloatParser {
    constructor(parent, parseCurrent = provideParseFloat(), negate = false) {
        this.parent = parent;
        this.parseCurrent = parseCurrent;
        this.negate = negate;
        this.parse = parseChain(this.parent, this.parseCurrent);
        this.equals = (value) => new FloatParser(this, provideEquals(parseFloat(value), this.negate));
        this.anyOf = (values) => new FloatParser(this, provideAnyOf(ensureNumberArray(values), this.negate));
        this.min = (value, exclusive = false) => new FloatParser(this, provideMin(parseFloat(value), exclusive, this.negate));
        this.max = (value, exclusive = false) => new FloatParser(this, provideMax(parseFloat(value), exclusive, this.negate));
        this.range = (min, max, exclusive = false) => new FloatParser(this, provideRange(parseFloat(min), parseFloat(max), exclusive, this.negate));
    }
    get not() {
        return new FloatParser(this.parent, this.parseCurrent, true);
    }
}
