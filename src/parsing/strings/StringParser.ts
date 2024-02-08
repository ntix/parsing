import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { ICurrentParser } from '../ICurrentParser';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { IString } from './IString';
import { provideEndsWithString } from './provideEndsWithString';
import { provideIncludesString } from './provideIncludesString';
import { provideStartsWithString } from './provideStartsWithString';
import { provideMatchesString } from './provideMatchesString';
import { provideEqualsString } from './provideEqualsString';
import { provideAnyOfString } from './provideAnyOfString';
import { asCurrent } from '../asCurrent';

/**
 * Fluent builder for parsing strings
 */
export class StringParser implements IString.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: ICurrentParser<string>,
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent, 'STRING');

  get not() {
    return new StringParser(this.parent, this.parseCurrent, !this.negate);
  }

  readonly equals = (value: string, ignoreCase = false) => new StringParser(this, asCurrent(provideEqualsString(value, ignoreCase), this.negate));
  readonly anyOf = (values: string[], ignoreCase = false) => new StringParser(this, asCurrent(provideAnyOfString(values, ignoreCase), this.negate));
  readonly minLength = (value: number, exclusive = false) => new StringParser(this, asCurrent(provideMinLength<string>(value, exclusive), this.negate));
  readonly maxLength = (value: number, exclusive = false) => new StringParser(this, asCurrent(provideMaxLength<string>(value, exclusive), this.negate));
  readonly matches = (value: string | RegExp, name: string = null) => new StringParser(this, asCurrent(provideMatchesString(value, name), this.negate));
  readonly includes = (value: string, ignoreCase = false) => new StringParser(this, asCurrent(provideIncludesString(value, ignoreCase), this.negate));
  readonly startsWith = (value: string, ignoreCase = false) => new StringParser(this, asCurrent(provideStartsWithString(value, ignoreCase), this.negate));
  readonly endsWith = (value: string, ignoreCase = false) => new StringParser(this, asCurrent(provideEndsWithString(value, ignoreCase), this.negate));
}
