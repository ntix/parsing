import { IParser } from './IParser';
/**
 * removes the given method from the builder
 * and any returned builder from other methods
 *
 * recursive
 */
export declare type RemoveFromBuilder<T, method extends string | number | symbol> = {
    [k in keyof Omit<T, method>]: RemoveFromReturnedBuilder<T[k], method>;
};
declare type RemoveFromReturnedBuilder<T, method extends string | number | symbol> = T extends <G>(p: IParser<G>) => IParser<G[]> ? <G>(p: IParser<G>) => IParser<G[]> : T extends (...a: infer P) => infer R ? (...args: P) => RemoveFromBuilder<R, method> : T;
export {};
