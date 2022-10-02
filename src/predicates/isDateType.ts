/* check value is a Date type */
export function isDateType(value: unknown): value is Date {
  return !!value && Object.prototype.toString.call(value) === '[object Date]';
}
