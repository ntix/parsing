import { provideMax } from '../provideMax';
import { parseChain } from '../parseChain';
import { provideEquals } from '../provideEquals';
import { provideMin } from '../provideMin';
import { provideAnyOf } from '../provideAnyOf';
import { provideRange } from '../provideRange';
import { ensureDateArray } from './ensureDateArray';
import { parseDate } from './parseDate';
import { provideParseDate } from './provideParseDate';
/**
 * Fluent builder for parsing dates
 */
export class DateParser {
    constructor(parent, parseCurrent = provideParseDate(), negate = false) {
        this.parent = parent;
        this.parseCurrent = parseCurrent;
        this.negate = negate;
        this.parse = parseChain(this.parent, this.parseCurrent);
        this.equals = (value) => new DateParser(this, provideEquals(parseDate(value), this.negate));
        this.anyOf = (values) => new DateParser(this, provideAnyOf(ensureDateArray(values), this.negate));
        this.min = (value, exclusive = false) => new DateParser(this, provideMin(parseDate(value), exclusive, this.negate));
        this.max = (value, exclusive = false) => new DateParser(this, provideMax(parseDate(value), exclusive, this.negate));
        this.range = (min, max, exclusive = false) => new DateParser(this, provideRange(parseDate(min), parseDate(max), exclusive, this.negate));
    }
    get not() {
        return new DateParser(this.parent, this.parseCurrent, true);
    }
}
DateParser.DefaultFormat = new Intl.DateTimeFormat();
