import requirementQueryParam from '../queryParam';

describe('queryParam', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'location', {
      value: {
        search: {
          key1: 'value1'
        }
      }
    });
  });

  it('should trhow error when type is wrong', () => {
    expect(() =>
      requirementQueryParam({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },

        type: '' as 'queryParam'
      })
    ).toThrow();
  });

  it('is', () => {
    expect(
      requirementQueryParam({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value1'
        },

        type: 'queryParam'
      })
    ).toBe(true);
    expect(
      requirementQueryParam({
        data: {
          comparator: 'is',
          name: 'key1',
          value: 'value2'
        },

        type: 'queryParam'
      })
    ).toBe(false);
  });

  it('isNot', () => {
    expect(
      requirementQueryParam({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value1'
        },

        type: 'queryParam'
      })
    ).toBe(false);
    expect(
      requirementQueryParam({
        data: {
          comparator: 'isNot',
          name: 'key1',
          value: 'value2'
        },

        type: 'queryParam'
      })
    ).toBe(true);
  });

  it('exists', () => {
    expect(
      requirementQueryParam({
        data: {
          comparator: 'exists',
          name: 'key1'
        },

        type: 'queryParam'
      })
    ).toBe(true);
    expect(
      requirementQueryParam({
        data: {
          comparator: 'exists',
          name: 'key2'
        },

        type: 'queryParam'
      })
    ).toBe(false);
  });

  it('doesNotExist', () => {
    expect(
      requirementQueryParam({
        data: {
          comparator: 'doesNotExist',
          name: 'key1'
        },

        type: 'queryParam'
      })
    ).toBe(false);
    expect(
      requirementQueryParam({
        data: {
          comparator: 'doesNotExist',
          name: 'key2'
        },

        type: 'queryParam'
      })
    ).toBe(true);
  });

  it('contains', () => {
    expect(
      requirementQueryParam({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: 'val'
        },

        type: 'queryParam'
      })
    ).toBe(true);
    expect(
      requirementQueryParam({
        data: {
          comparator: 'contains',
          name: 'key1',
          value: '123'
        },

        type: 'queryParam'
      })
    ).toBe(false);
  });

  it('doesNotContain', () => {
    expect(
      requirementQueryParam({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: 'val'
        },

        type: 'queryParam'
      })
    ).toBe(false);
    expect(
      requirementQueryParam({
        data: {
          comparator: 'doesNotContain',
          name: 'key1',
          value: '123'
        },

        type: 'queryParam'
      })
    ).toBe(true);
  });
});
