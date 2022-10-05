(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.parsing = {}));
})(this, (function (exports) { 'use strict';

    function isBooleanType(value) {
        return typeof value === 'boolean';
    }

    /* check value is a Date type */
    function isDateType(value) {
        return !!value && Object.prototype.toString.call(value) === '[object Date]';
    }

    /** checks value is a number, includes NaN and Infinity */
    function isNumberType(value) {
        return typeof value === 'number';
    }

    /** checks value is a string */
    function isStringType(value) {
        return typeof value === 'string';
    }

    /** checks value is a date */
    function isDate(value) {
        if (isDateType(value))
            return true;
        if (isStringType(value))
            return !isNaN(Date.parse(value));
        if (isNumberType(value))
            return !isNaN(value);
        return false;
    }

    /** deep equality check
     *
     * NOTE: arrays should be in the same order
     * */
    function isEqual(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (Array.isArray(a))
            return Array.isArray(b) && a.length === b.length && a.every((v, i) => isEqual(v, b[i]));
        if (typeof a === 'object' || typeof b === 'object') {
            const av = a.valueOf();
            const bv = b.valueOf();
            if (av !== a || bv !== b)
                return isEqual(av, bv);
            return Object.keys(Object.assign(Object.assign({}, a), b)).every(n => isEqual(a[n], b[n]));
        }
        return false;
    }

    /** checks values is a integer or a string which can be parsed into a integer */
    function isFloat(value) {
        if (isStringType(value))
            value = Number.parseFloat(value);
        return isNumberType(value) && !isNaN(value);
    }

    /** checks values is an integer or a string which can be parsed into a integer */
    function isInt(value) {
        if (isStringType(value))
            value = Number.parseFloat(value);
        return isNumberType(value) && !isNaN(value) && Number.isInteger(value);
    }

    /** check for null (or undefined) or empty string */
    function isNullOrEmpty(value) {
        return value == null || value === '';
    }

    function createParseResult(value, errors = ParseErrors.empty) {
        const success = isEqual(errors, ParseErrors.empty);
        return {
            value,
            success,
            errors: success ? ParseErrors.empty : errors // for quick check
        };
    }

    function parseChain(parent, current) {
        return (value) => {
            if (parent == null) {
                // when root Schema
                return current(value);
            }
            const parentResult = parent.parse(value);
            const result = current(parentResult.value);
            return createParseResult(result.value, Object.assign(Object.assign({}, parentResult.errors), result.errors));
        };
    }

    /**
     * Validate a value is any of values passed
     */
    function provideAnyOf(values, negate) {
        return (value) => {
            if (isNullOrEmpty(value))
                return createParseResult(null);
            if (values.some(v => isEqual(v, value)) === !negate)
                return createParseResult(value);
            const errors = negate
                ? ParseErrors.not(ParseErrors.anyOf(values))
                : ParseErrors.anyOf(values);
            return createParseResult(value, errors);
        };
    }

    function provideEquals(equalToValue, negate) {
        return (value) => {
            if (isNullOrEmpty(value) || isEqual(value, equalToValue) !== negate)
                return createParseResult(value);
            let errors = ParseErrors.equals(equalToValue);
            if (negate)
                errors = ParseErrors.not(errors);
            return createParseResult(value, errors);
        };
    }

    /**
     * Validate a value is a maximum
     */
    function provideMax(maxValue, exclusive, negate) {
        return (value) => {
            if (isNullOrEmpty(value)
                || (exclusive ? value < maxValue : value <= maxValue) !== negate)
                return createParseResult(value);
            let errors = ParseErrors.max(maxValue, exclusive);
            if (negate)
                errors = ParseErrors.not(errors);
            return createParseResult(value, errors);
        };
    }

    /**
     * Validate a value is a minimum
     */
    function provideMin(minValue, exclusive, negate) {
        return (value) => {
            if (isNullOrEmpty(value)
                || (exclusive ? value > minValue : value >= minValue) !== negate)
                return createParseResult(value);
            let errors = ParseErrors.min(minValue, exclusive);
            if (negate)
                errors = ParseErrors.not(errors);
            return createParseResult(value, errors);
        };
    }

    /**
     * Validate a value is a minimum
     */
    function provideRange(minValue, maxValue, exclusive, negate) {
        return (value) => {
            if (isNullOrEmpty(value)
                || ((exclusive ? value > minValue : value >= minValue)
                    && (exclusive ? value < maxValue : value <= maxValue)) !== negate)
                return createParseResult(value);
            let errors = ParseErrors.range(minValue, maxValue, exclusive);
            if (negate)
                errors = ParseErrors.not(errors);
            return createParseResult(value, errors);
        };
    }

    /** get a number values array from the map */
    function getNumberEnumValues(value) {
        return Object.values(value).filter(v => isInt(v));
    }

    /** get values array if not already */
    function ensureNumberArray(valuesOrEnum) {
        return Array.isArray(valuesOrEnum)
            ? valuesOrEnum
            : getNumberEnumValues(valuesOrEnum);
    }

    function tryParseFloat(value) {
        if (isNullOrEmpty(value) || !isFloat(value))
            return null;
        if (isNumberType(value))
            return value;
        return Number.parseFloat(value);
    }

    function parseFloat(value) {
        const result = tryParseFloat(value);
        if (result === null)
            throw new Error(`could not parse "${value}" as a number`);
        return result;
    }

    function provideParseFloat() {
        return (value) => {
            if (isNullOrEmpty(value))
                return createParseResult(null);
            const numberValue = tryParseFloat(value);
            return numberValue === null
                ? createParseResult(null, ParseErrors.float)
                : createParseResult(numberValue);
        };
    }

    /**
     * Fluent builder for parsing floats
     */
    class FloatParser {
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

    /** Attempt to parse an integer value */
    function tryParseInt(value, radix = undefined) {
        if (isNullOrEmpty(value) || !isInt(value))
            return null;
        if (isNumberType(value))
            return value;
        return Number.parseInt(value, radix);
    }

    function provideParseInt() {
        return (value) => {
            if (isNullOrEmpty(value))
                return createParseResult(null);
            const numberValue = tryParseInt(value);
            return numberValue === null
                ? createParseResult(null, ParseErrors.int)
                : createParseResult(numberValue);
        };
    }

    /**
     * Parse the value passed
     *
     * @param value a parsable number type
     * @param radix base (2-36) defaults to 10 for decimal
     * @returns number or throws if not
     */
    function parseInt(value, radix) {
        const result = tryParseInt(value, radix);
        if (result === null)
            throw new Error(`could not parse "${value}" as a number`);
        return result;
    }

    /**
     * Fluent builder for parsing ints
     */
    class IntParser {
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

    /**
     * Creates error objects
     */
    class ParseErrors {
    }
    /** not an error */
    ParseErrors.empty = {};
    /** required */
    ParseErrors.required = { required: true };
    /** wrap error in a not */
    ParseErrors.not = (value) => ({ not: value });
    /** value should be a boolean */
    ParseErrors.boolean = { boolean: true };
    /** value should be an int */
    ParseErrors.int = { int: true };
    /** value should be a float */
    ParseErrors.float = { float: true };
    /** value should be a date */
    ParseErrors.date = { date: true };
    /** value should be equal to the value */
    ParseErrors.equals = (value) => ({ equals: value });
    /** value should be equal to any of the values */
    ParseErrors.anyOf = (values) => ({ anyOf: Array.isArray(values) ? values : getNumberEnumValues(values) });
    /** value should be at least */
    ParseErrors.min = (value, exclusive) => ({ min: { value, exclusive } });
    /** value should be at most */
    ParseErrors.max = (value, exclusive) => ({ max: { value, exclusive } });
    /** value should in range */
    ParseErrors.range = (min, max, exclusive) => ({ range: { min, max, exclusive } });
    /** value length should be at least */
    ParseErrors.minLength = (value) => ({ minLength: value });
    /** value length should be at most */
    ParseErrors.maxLength = (value) => ({ maxLength: value });
    /** value should in range */
    ParseErrors.rangeLength = (min, max, exclusive) => ({ rangeLength: { min, max, exclusive } });
    /** value should be an array */
    ParseErrors.array = { array: true };

    /**
     * parse all elements of an array
     *
     * @param parse function
     * @returns IParseResult<T[]>
     */
    function parseAll(parse) {
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

    function provideMaxLength(maxLength, exclusive, negate) {
        return (value) => {
            if (isNullOrEmpty(value)
                || (exclusive ? value.length < maxLength : value.length <= maxLength) !== negate)
                return createParseResult(value);
            let errors = ParseErrors.maxLength(maxLength);
            if (negate)
                errors = ParseErrors.not(errors);
            return createParseResult(value, errors);
        };
    }

    function provideMinLength(minLength, exclusive, negate) {
        return (value) => {
            if (isNullOrEmpty(value)
                || (exclusive ? value.length > minLength : value.length >= minLength) !== negate)
                return createParseResult(value);
            let errors = ParseErrors.minLength(minLength);
            if (negate)
                errors = ParseErrors.not(errors);
            return createParseResult(value, errors);
        };
    }

    function provideRangeLength(minLength, maxLength, exclusive, negate) {
        return (value) => {
            if (isNullOrEmpty(value)
                || ((exclusive ? value.length > minLength : value.length >= minLength)
                    && (exclusive ? value.length < maxLength : value.length <= maxLength)) !== negate)
                return createParseResult(value);
            let errors = ParseErrors.rangeLength(minLength, maxLength, exclusive);
            if (negate)
                errors = ParseErrors.not(errors);
            return createParseResult(value, errors);
        };
    }

    function provideParseArray() {
        return (value) => {
            if (isNullOrEmpty(value))
                return createParseResult(null);
            if (Array.isArray(value))
                return createParseResult(value);
            return createParseResult(null, ParseErrors.array);
        };
    }

    class ArrayParser {
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

    /** values considered to be a boolean true */
    const BOOLEANS_TRUE = [1, '1', 'true', 'on'];
    /** values considered to be a boolean false */
    const BOOLEANS_FALSE = [0, '0', 'false', 'off'];
    /**
     * try and parse the value as a boolean
     *
     * @param value value to parse
     * @returns boolean or a null if failed parse
     */
    function tryParseBoolean(value) {
        if (isNullOrEmpty(value))
            return null;
        if (isBooleanType(value))
            return value;
        if (isStringType(value))
            value = value.toLowerCase();
        if (BOOLEANS_TRUE.includes(value))
            return true;
        if (BOOLEANS_FALSE.includes(value))
            return false;
        return null;
    }

    function provideParseBoolean() {
        return (value) => {
            if (isNullOrEmpty(value))
                return createParseResult(null);
            value = tryParseBoolean(value);
            return (value === null)
                ? createParseResult(null, ParseErrors.boolean)
                : createParseResult(value);
        };
    }

    /**
     * Fluent builder for parsing booleans
     */
    class BooleanParser {
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

    /**
     * Attempt to parse a value to a date
     *
     * TODO: improve, add support for user inputted strings US/UK etc
     * @param value to be parsed
     * @returns a date or null
     */
    function tryParseDate(value) {
        if (isNullOrEmpty(value))
            return null;
        if (isDateType(value))
            return value;
        if (!isDate(value))
            return null;
        return new Date(value);
    }

    /**
     * Parse a date, throw if not a date
     *
     * @param value to be parsed
     * @returns a date or null
     */
    function parseDate(value) {
        const result = tryParseDate(value);
        if (result === null)
            throw new Error(`could not parse "${value}" as a date`);
        return result;
    }

    function ensureDateArray(values) {
        return values.map(parseDate);
    }

    function provideParseDate() {
        return (value) => {
            if (isNullOrEmpty(value))
                return createParseResult(null);
            if (isDateType(value))
                return createParseResult(value);
            const dateValue = tryParseDate(value);
            return dateValue === null
                ? createParseResult(null, ParseErrors.date)
                : createParseResult(dateValue);
        };
    }

    /**
     * Fluent builder for parsing dates
     */
    class DateParser {
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

    class ComplexParser {
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

    function provideParseString() {
        return (value) => {
            if (isNullOrEmpty(value))
                return createParseResult(null);
            return createParseResult(value.toString());
        };
    }

    /**
     * Fluent builder for parsing strings
     */
    class StringParser {
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

    class RootParser {
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

    /** Starting point for a new parsing and validating */
    class Is {
        constructor() {
            throw new Error('static class');
        }
    }
    Is.required = new RootParser(true);
    Is.boolean = new RootParser().boolean;
    Is.int = new RootParser().int;
    Is.float = new RootParser().float;
    Is.date = new RootParser().date;
    Is.string = new RootParser().string;
    Is.array = new RootParser().array;
    Is.for = new RootParser().for;
    Is.use = new RootParser().use;

    exports.ArrayParser = ArrayParser;
    exports.BOOLEANS_FALSE = BOOLEANS_FALSE;
    exports.BOOLEANS_TRUE = BOOLEANS_TRUE;
    exports.BooleanParser = BooleanParser;
    exports.ComplexParser = ComplexParser;
    exports.DateParser = DateParser;
    exports.FloatParser = FloatParser;
    exports.IntParser = IntParser;
    exports.Is = Is;
    exports.ParseErrors = ParseErrors;
    exports.RootParser = RootParser;
    exports.StringParser = StringParser;
    exports.createParseResult = createParseResult;
    exports.ensureDateArray = ensureDateArray;
    exports.ensureNumberArray = ensureNumberArray;
    exports.getNumberEnumValues = getNumberEnumValues;
    exports.isBooleanType = isBooleanType;
    exports.isDate = isDate;
    exports.isDateType = isDateType;
    exports.isEqual = isEqual;
    exports.isFloat = isFloat;
    exports.isInt = isInt;
    exports.isNullOrEmpty = isNullOrEmpty;
    exports.isNumberType = isNumberType;
    exports.isStringType = isStringType;
    exports.parseAll = parseAll;
    exports.parseChain = parseChain;
    exports.parseDate = parseDate;
    exports.parseFloat = parseFloat;
    exports.parseInt = parseInt;
    exports.provideAnyOf = provideAnyOf;
    exports.provideEquals = provideEquals;
    exports.provideMax = provideMax;
    exports.provideMaxLength = provideMaxLength;
    exports.provideMin = provideMin;
    exports.provideMinLength = provideMinLength;
    exports.provideParseArray = provideParseArray;
    exports.provideParseBoolean = provideParseBoolean;
    exports.provideParseDate = provideParseDate;
    exports.provideParseFloat = provideParseFloat;
    exports.provideParseInt = provideParseInt;
    exports.provideParseString = provideParseString;
    exports.provideRange = provideRange;
    exports.provideRangeLength = provideRangeLength;
    exports.tryParseBoolean = tryParseBoolean;
    exports.tryParseDate = tryParseDate;
    exports.tryParseFloat = tryParseFloat;
    exports.tryParseInt = tryParseInt;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
