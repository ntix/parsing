/** deep equality check
 *
 * NOTE: arrays should be in the same order
 * */
export function isEqual(a, b) {
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
