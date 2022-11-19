import { IParse } from '../IParse';
import { IParser } from '../IParser';
import { parseChain } from '../parseChain';
import { provideMaxLength } from '../provideMaxLength';
import { provideMinLength } from '../provideMinLength';
import { IString } from './IString';
import { provideEndsWithString } from './provideEndsWithString';
import { provideParseString } from './provideParseString';
import { provideIncludesString } from './provideIncludesString';
import { provideStartsWithString } from './provideStartsWithString';
import { provideMatchesString } from './provideMatchesString';
import { provideEqualsString } from './provideEqualsString';
import { provideOneOfString } from './provideOneOfString';

/**
 * Fluent builder for parsing strings
 */
export class StringParser implements IString.Parser {
  constructor(
    private parent: IParser<unknown>,
    private parseCurrent: IParse<string|undefined> = provideParseString(),
    private negate: boolean = false
  ) { }

  readonly parse = parseChain(this.parent, this.parseCurrent);
  readonly equals = (value: string, ignoreCase = false) => new StringParser(this, provideEqualsString(value, ignoreCase, this.negate));
  readonly oneOf = (values: string[], ignoreCase = false) => new StringParser(this, provideOneOfString(values, ignoreCase, this.negate));
  readonly minLength = (value: number, exclusive = false) => new StringParser(this, provideMinLength<string>(value, exclusive, this.negate));
  readonly maxLength = (value: number, exclusive = false) => new StringParser(this, provideMaxLength<string>(value, exclusive, this.negate));
  readonly matches = (value: string | RegExp, name: string = null) => new StringParser(this, provideMatchesString(value, name, this.negate));
  readonly includes = (value: string, ignoreCase = false) => new StringParser(this, provideIncludesString(value, ignoreCase, this.negate));
  readonly startsWith = (value: string, ignoreCase = false) => new StringParser(this, provideStartsWithString(value, ignoreCase, this.negate));
  readonly endsWith = (value: string, ignoreCase = false) => new StringParser(this, provideEndsWithString(value, ignoreCase, this.negate));

  get not() {
    return new StringParser(this.parent, this.parseCurrent, true);
  }
}
