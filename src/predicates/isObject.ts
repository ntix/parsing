/**
 * check a value is an object
 * 
 * @param value value to check
 * @returns true if value is an object 
 */
export const isObject
    : (value: unknown) => boolean
    = value => typeof value === 'object' && value !== null && !Array.isArray(value);