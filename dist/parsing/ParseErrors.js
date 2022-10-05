import { getNumberEnumValues } from './numbers';
/**
 * Creates error objects
 */
export class ParseErrors {
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
/** value includes */
ParseErrors.matches = (name) => ({ matches: name });
/** value includes */
ParseErrors.includes = (value, ignoreCase) => ({ includes: { value, ignoreCase } });
/** starts with */
ParseErrors.startsWith = (value, ignoreCase) => ({ startsWith: { value, ignoreCase } });
/** ends with */
ParseErrors.endsWith = (value, ignoreCase) => ({ endsWith: { value, ignoreCase } });
