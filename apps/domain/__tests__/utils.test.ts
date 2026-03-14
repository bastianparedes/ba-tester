import { flattenObject, isObject } from '../utils';

describe('isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  it('returns false for arrays', () => {
    expect(isObject([])).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
  });

  it('returns false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('returns false for primitive values', () => {
    expect(isObject(1)).toBe(false);
    expect(isObject('test')).toBe(false);
    expect(isObject(true)).toBe(false);
  });

  it('returns false for functions', () => {
    expect(isObject(() => {})).toBe(false);
  });
});

describe('flattenObject', () => {
  it('flattens a flat object', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = flattenObject(input);

    expect(result).toEqual([1, 2, 3]);
  });

  it('flattens a nested object', () => {
    const input = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };

    const result = flattenObject(input);

    expect(result).toEqual([1, 2, 3]);
  });

  it('flattens deeply nested objects', () => {
    const input = {
      a: 1,
      b: {
        c: {
          d: 2,
        },
      },
      e: 3,
    };

    const result = flattenObject(input);

    expect(result).toEqual([1, 2, 3]);
  });

  it('works with string values', () => {
    const input = {
      a: 'hello',
      b: {
        c: 'world',
      },
    };

    const result = flattenObject(input);

    expect(result).toEqual(['hello', 'world']);
  });

  it('works with boolean values', () => {
    const input = {
      a: true,
      b: {
        c: false,
      },
    };

    const result = flattenObject(input);

    expect(result).toEqual([true, false]);
  });

  it('returns empty array for empty object', () => {
    const input = {};

    const result = flattenObject(input);

    expect(result).toEqual([]);
  });
});
