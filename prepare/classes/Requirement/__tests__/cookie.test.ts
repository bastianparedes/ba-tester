import requirementCookie from '../cookie';

describe('cookie', () => {
  beforeEach(() => {
    Object.defineProperty(global.document, 'cookie', {
      value: 'key1=value1'
    });
  });

  it('should trhow error when type is wrong', () => {
    expect(() =>
      requirementCookie({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },
        type: '' as 'cookie'
      })
    ).toThrow();
  });

  it('is', () => {
    expect(
      requirementCookie({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },
        type: 'cookie'
      })
    ).toBe(true);
    expect(
      requirementCookie({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value2'
        },
        type: 'cookie'
      })
    ).toBe(false);
  });

  it('isNot', () => {
    expect(
      requirementCookie({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value1'
        },
        type: 'cookie'
      })
    ).toBe(false);
    expect(
      requirementCookie({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value2'
        },
        type: 'cookie'
      })
    ).toBe(true);
  });

  it('exists', () => {
    expect(
      requirementCookie({
        data: {
          comparator: 'exists',
          name: 'key1'
        },
        type: 'cookie'
      })
    ).toBe(true);
    expect(
      requirementCookie({
        data: {
          comparator: 'exists',
          name: 'key2'
        },
        type: 'cookie'
      })
    ).toBe(false);
  });

  it('doesNotExist', () => {
    expect(
      requirementCookie({
        data: {
          comparator: 'doesNotExist',
          name: 'key1'
        },
        type: 'cookie'
      })
    ).toBe(false);
    expect(
      requirementCookie({
        data: {
          comparator: 'doesNotExist',
          name: 'key2'
        },
        type: 'cookie'
      })
    ).toBe(true);
  });

  it('contains', () => {
    expect(
      requirementCookie({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: 'val'
        },
        type: 'cookie'
      })
    ).toBe(true);
    expect(
      requirementCookie({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: '123'
        },
        type: 'cookie'
      })
    ).toBe(false);
  });

  it('doesNotContain', () => {
    expect(
      requirementCookie({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: 'val'
        },
        type: 'cookie'
      })
    ).toBe(false);
    expect(
      requirementCookie({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: '123'
        },
        type: 'cookie'
      })
    ).toBe(true);
  });
});
