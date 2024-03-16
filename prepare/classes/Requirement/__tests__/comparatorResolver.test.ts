import resolver from '../comparatorResolver';

describe('resolver', () => {
  it('should handle "atLeast" comparator correctly', () => {
    expect(
      resolver({ comparator: 'atLeast', expectedValue: 3, obtainedValue: 5 })
    ).toBe(true);
    expect(
      resolver({ comparator: 'atLeast', expectedValue: 3, obtainedValue: 3 })
    ).toBe(true);
    expect(
      resolver({ comparator: 'atLeast', expectedValue: 3, obtainedValue: 2 })
    ).toBe(false);
  });

  it('should handle "atMost" comparator correctly', () => {
    expect(
      resolver({ comparator: 'atMost', expectedValue: 10, obtainedValue: 5 })
    ).toBe(true);
    expect(
      resolver({ comparator: 'atMost', expectedValue: 5, obtainedValue: 5 })
    ).toBe(true);
    expect(
      resolver({ comparator: 'atMost', expectedValue: 10, obtainedValue: 15 })
    ).toBe(false);
  });

  it('should handle "exactly" comparator correctly', () => {
    expect(
      resolver({ comparator: 'exactly', expectedValue: 5, obtainedValue: 5 })
    ).toBe(true);
    expect(
      resolver({ comparator: 'exactly', expectedValue: 10, obtainedValue: 5 })
    ).toBe(false);
  });

  it('should handle "lessThan" comparator correctly', () => {
    expect(
      resolver({ comparator: 'lessThan', expectedValue: 10, obtainedValue: 5 })
    ).toBe(true);
    expect(
      resolver({ comparator: 'lessThan', expectedValue: 10, obtainedValue: 10 })
    ).toBe(false);
    expect(
      resolver({ comparator: 'lessThan', expectedValue: 10, obtainedValue: 15 })
    ).toBe(false);
  });

  it('should handle "moreThan" comparator correctly', () => {
    expect(
      resolver({ comparator: 'moreThan', expectedValue: 2, obtainedValue: 5 })
    ).toBe(true);
    expect(
      resolver({ comparator: 'moreThan', expectedValue: 5, obtainedValue: 5 })
    ).toBe(false);
    expect(
      resolver({ comparator: 'moreThan', expectedValue: 10, obtainedValue: 5 })
    ).toBe(false);
  });

  it('should handle "contains" comparator correctly', () => {
    expect(
      resolver({
        comparator: 'contains',
        expectedValue: 'ell',
        obtainedValue: 'hello'
      })
    ).toBe(true);
    expect(
      resolver({
        comparator: 'contains',
        expectedValue: 'world',
        obtainedValue: 'hello'
      })
    ).toBe(false);
  });

  it('should handle "doesNotContain" comparator correctly', () => {
    expect(
      resolver({
        comparator: 'doesNotContain',
        expectedValue: 'world',
        obtainedValue: 'hello'
      })
    ).toBe(true);
    expect(
      resolver({
        comparator: 'doesNotContain',
        expectedValue: 'ell',
        obtainedValue: 'hello'
      })
    ).toBe(false);
  });

  it('should handle "is" comparator correctly', () => {
    expect(
      resolver({
        comparator: 'is',
        expectedValue: 'hello',
        obtainedValue: 'hello'
      })
    ).toBe(true);
    expect(
      resolver({
        comparator: 'is',
        expectedValue: 'world',
        obtainedValue: 'hello'
      })
    ).toBe(false);
  });

  it('should handle "isNot" comparator correctly', () => {
    expect(
      resolver({
        comparator: 'isNot',
        expectedValue: 'world',
        obtainedValue: 'hello'
      })
    ).toBe(true);
    expect(
      resolver({
        comparator: 'isNot',
        expectedValue: 'hello',
        obtainedValue: 'hello'
      })
    ).toBe(false);
  });

  it('should handle "doesNotExist" comparator correctly', () => {
    expect(
      resolver({
        comparator: 'doesNotExist',
        expectedValue: undefined,
        obtainedValue: null
      })
    ).toBe(true);
    expect(
      resolver({
        comparator: 'doesNotExist',
        expectedValue: undefined,
        obtainedValue: 'hello'
      })
    ).toBe(false);
  });

  it('should handle "exists" comparator correctly', () => {
    expect(
      resolver({
        comparator: 'exists',
        expectedValue: undefined,
        obtainedValue: null
      })
    ).toBe(false);
    expect(
      resolver({
        comparator: 'exists',
        expectedValue: undefined,
        obtainedValue: 'hello'
      })
    ).toBe(true);
    expect(
      resolver({
        comparator: 'exists',
        expectedValue: undefined,
        obtainedValue: undefined
      })
    ).toBe(false);
  });
});
