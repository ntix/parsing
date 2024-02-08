import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { IComplex } from './IComplex';
import { provideEquals } from '../provideEquals';
import { asCurrent } from '../asCurrent';

export class ComplexParser<T> implements IComplex.Parser<T> {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<T>,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent, 'COMPLEX');

  get not() {
    return new ComplexParser<T>(this.parent, this.parseCurrent, !this.negate);
  }

  readonly equals = (equalToValue: T) => new ComplexParser<T>(this, asCurrent(provideEquals(equalToValue), this.negate));
}
