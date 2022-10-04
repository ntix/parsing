import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { provideAnyOf } from '../provideAnyOf';
import { provideEquals } from '../provideEquals';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { provideRangeLength } from '../provideRangeLength';
import { IString } from './IString';
import { provideParseString } from './provideParseString';

/**
 * Fluent builder for parsing strings
 */
export class StringParser implements IString.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<string> = provideParseString(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent);
  readonly equals = (value: string) => new StringParser(this, provideEquals(value, this.negate));
  readonly anyOf = (values: string[]) => new StringParser(this, provideAnyOf(values, this.negate));
  readonly minLength = (value: number, exclusive = false) => new StringParser(this, provideMinLength<string>(value, exclusive, this.negate));
  readonly maxLength = (value: number, exclusive = false) => new StringParser(this, provideMaxLength<string>(value, exclusive, this.negate));
  readonly rangeLength = (min: number, max: number, exclusive = false) => new StringParser(this, provideRangeLength<string>(min, max, exclusive, this.negate));

  get not() {
    return new StringParser(this.parent, this.parseCurrent, true);
  }
}
