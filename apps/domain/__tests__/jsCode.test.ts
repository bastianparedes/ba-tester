import { jsCodeHasCorrectSyntax } from '../jsCode';

describe('jsCodeHasCorrectSyntax', () => {
  it('should return true for valid JS code', () => {
    const code = `const a = 1; console.log(a);`;
    expect(jsCodeHasCorrectSyntax(code)).toBe(true);
  });

  it('should return true for valid async JS code', () => {
    const code = `await Promise.resolve(42);`;
    expect(jsCodeHasCorrectSyntax(code)).toBe(true);
  });

  it('should return false for invalid JS code', () => {
    const code = `const a = ;`;
    expect(jsCodeHasCorrectSyntax(code)).toBe(false);
  });

  it('should return false for malformed async code', () => {
    const code = `await ;`;
    expect(jsCodeHasCorrectSyntax(code)).toBe(false);
  });
});