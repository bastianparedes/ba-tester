import requirementLocalStorage from '../localStorage';

describe('localStorage', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
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
      requirementLocalStorage({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },

        type: '' as 'localStorage'
      })
    ).toThrow();
  });

  it('is', () => {
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },

        type: 'localStorage'
      })
    ).toBe(true);
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value2'
        },

        type: 'localStorage'
      })
    ).toBe(false);
  });

  it('isNot', () => {
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value1'
        },

        type: 'localStorage'
      })
    ).toBe(false);
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value2'
        },

        type: 'localStorage'
      })
    ).toBe(true);
  });

  it('exists', () => {
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'exists',
          name: 'key1'
        },

        type: 'localStorage'
      })
    ).toBe(true);
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'exists',
          name: 'key2'
        },

        type: 'localStorage'
      })
    ).toBe(false);
  });

  it('doesNotExist', () => {
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'doesNotExist',
          name: 'key1'
        },

        type: 'localStorage'
      })
    ).toBe(false);
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'doesNotExist',
          name: 'key2'
        },

        type: 'localStorage'
      })
    ).toBe(true);
  });

  it('contains', () => {
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: 'val'
        },

        type: 'localStorage'
      })
    ).toBe(true);
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: '123'
        },

        type: 'localStorage'
      })
    ).toBe(false);
  });

  it('doesNotContain', () => {
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: 'val'
        },

        type: 'localStorage'
      })
    ).toBe(false);
    expect(
      requirementLocalStorage({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: '123'
        },

        type: 'localStorage'
      })
    ).toBe(true);
  });
});
