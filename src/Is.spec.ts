import { Is } from './Is';

describe('Is', () => {

  it('throws when construtcor is called', () => {

    expect(() => new (
      Is as unknown as any // eslint-disable-line @typescript-eslint/no-explicit-any
    )()).toThrow();
  });

});
