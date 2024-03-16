/* eslint-disable @typescript-eslint/no-empty-function */
import { isObject } from '../object';

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: 'value' })).toBe(true);
    expect(isObject(new Object())).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject(() => {})).toBe(false);
    expect(isObject(function () {})).toBe(false);
  });
});
