import requirementSessionstorage from '../sessionStorage';

describe('sessionStorage', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'sessionStorage', {
      value: {
        getItem: (key: unknown) =>
          ({
            key1: 'value1'
          })[String(key)]
      }
    });
  });

  it('should trhow error when type is wrong', () => {
    expect(() =>
      requirementSessionstorage({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },

        type: '' as 'sessionStorage'
      })
    ).toThrow();
  });

  it('is', () => {
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },

        type: 'sessionStorage'
      })
    ).toBe(true);
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value2'
        },

        type: 'sessionStorage'
      })
    ).toBe(false);
  });

  it('isNot', () => {
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value1'
        },

        type: 'sessionStorage'
      })
    ).toBe(false);
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value2'
        },

        type: 'sessionStorage'
      })
    ).toBe(true);
  });

  it('exists', () => {
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'exists',
          name: 'key1'
        },

        type: 'sessionStorage'
      })
    ).toBe(true);
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'exists',
          name: 'key2'
        },

        type: 'sessionStorage'
      })
    ).toBe(false);
  });

  it('doesNotExist', () => {
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'doesNotExist',
          name: 'key1'
        },

        type: 'sessionStorage'
      })
    ).toBe(false);
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'doesNotExist',
          name: 'key2'
        },

        type: 'sessionStorage'
      })
    ).toBe(true);
  });

  it('contains', () => {
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: 'val'
        },

        type: 'sessionStorage'
      })
    ).toBe(true);
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: '123'
        },

        type: 'sessionStorage'
      })
    ).toBe(false);
  });

  it('doesNotContain', () => {
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: 'val'
        },

        type: 'sessionStorage'
      })
    ).toBe(false);
    expect(
      requirementSessionstorage({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: '123'
        },

        type: 'sessionStorage'
      })
    ).toBe(true);
  });
});
