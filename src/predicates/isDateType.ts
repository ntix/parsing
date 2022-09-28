/* check value is a Date type */
export function isDateType(value: any): value is Date {
  return (
    !!value &&
    !isNaN(value) &&
    Object.prototype.toString.call(value) === '[object Date]'
  );
}
