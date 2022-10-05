import { NumberEnumMap } from './numbers';
/**
 * Creates error objects
 */
export declare class ParseErrors {
    /** not an error */
    static readonly empty: {};
    /** required */
    static readonly required: {
        required: boolean;
    };
    /** wrap error in a not */
    static readonly not: <T>(value: T) => {
        not: T;
    };
    /** value should be a boolean */
    static readonly boolean: {
        boolean: boolean;
    };
    /** value should be an int */
    static readonly int: {
        int: boolean;
    };
    /** value should be a float */
    static readonly float: {
        float: boolean;
    };
    /** value should be a date */
    static readonly date: {
        date: boolean;
    };
    /** value should be equal to the value */
    static readonly equals: <T>(value: T) => {
        equals: T;
    };
    /** value should be equal to any of the values */
    static readonly anyOf: <T>(values: NumberEnumMap | T[]) => {
        anyOf: (string | number)[] | T[];
    };
    /** value should be at least */
    static readonly min: <T>(value: T, exclusive: boolean) => {
        min: {
            value: T;
            exclusive: boolean;
        };
    };
    /** value should be at most */
    static readonly max: <T>(value: T, exclusive: boolean) => {
        max: {
            value: T;
            exclusive: boolean;
        };
    };
    /** value should in range */
    static readonly range: <T>(min: T, max: T, exclusive: boolean) => {
        range: {
            min: T;
            max: T;
            exclusive: boolean;
        };
    };
    /** value length should be at least */
    static readonly minLength: <T>(value: T) => {
        minLength: T;
    };
    /** value length should be at most */
    static readonly maxLength: <T>(value: T) => {
        maxLength: T;
    };
    /** value should in range */
    static readonly rangeLength: <T>(min: T, max: T, exclusive: boolean) => {
        rangeLength: {
            min: T;
            max: T;
            exclusive: boolean;
        };
    };
    /** value should be an array */
    static readonly array: {
        array: boolean;
    };
}
