import { isObject } from "./isObject";

describe('isObject', () => {
    [
        { value: null, expected: false },
        { value: undefined, expected: false },
        { value: 1234, expected: false },
        { value: 'STRING', expected: false },
        { value: true, expected: false },
        { value: [], expected: false },
        { value: {}, expected: true },
        { value: { a: 1 }, expected: true }
    ].forEach(({ value: value, expected }) => {

        it(`should return ${expected} for ${JSON.stringify(value)}`, () => {
            expect(isObject(value)).toBe(expected);
        });
    });
});