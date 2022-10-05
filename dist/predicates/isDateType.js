/* check value is a Date type */
export function isDateType(value) {
    return !!value && Object.prototype.toString.call(value) === '[object Date]';
}
