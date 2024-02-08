/**
 * removes/adds given methods from the builder
 */
export type NextBuilder<P, remove extends keyof P = never, add extends keyof P = never> =
    {
        [K in Exclude<keyof P, Exclude<remove, add>>]
        : P[K]
    }
