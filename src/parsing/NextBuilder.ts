/**
 * removes/adds given methods from the builder
 * and any returned builder from other methods
 *
 * recursive
 */
export type NextBuilder<B, exclude extends keyof B = never, include extends keyof B = never> =
 {
     [key in Exclude<keyof B, Exclude<exclude, include>>]
     : B[key] extends (...args: infer A) => NextBuilder<B, infer e, infer i>
     ? (...args: A) => NextBuilder<B, e | Exclude<exclude, include>, i> // cascade excludes and includes
     : B[key];
 };
