import { startWithZero } from '../date';

describe('startWithZero', () => {
  it('should return a string with a leading zero for numbers between 0 and 9', () => {
    expect(startWithZero(0)).toBe('00');
    expect(startWithZero(1)).toBe('01');
    expect(startWithZero(9)).toBe('09');
  });

  it('should return the string representation of the number for numbers between 10 and 59', () => {
    expect(startWithZero(10)).toBe('10');
    expect(startWithZero(42)).toBe('42');
    expect(startWithZero(59)).toBe('59');
  });

  it('should throw an error for non-integer numbers', () => {
    expect(() => startWithZero(1.5)).toThrow('Integer number expected');
  });

  it('should throw an error for numbers less than 0', () => {
    expect(() => startWithZero(-1)).toThrow(
      'Number between 0 and 59 included expected'
    );
  });

  it('should throw an error for numbers greater than 59', () => {
    expect(() => startWithZero(60)).toThrow(
      'Number between 0 and 59 included expected'
    );
  });
});
