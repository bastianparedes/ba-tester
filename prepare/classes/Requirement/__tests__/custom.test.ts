import requirementCustom from '../custom';

describe('custom', () => {
  jest.useFakeTimers();

  it('should trhow error when type is wrong', () => {
    expect(() =>
      requirementCustom({
        data: {
          javascript: '',
          name: 'Cusotm 1'
        },

        type: '' as 'custom'
      })
    ).toThrow();
  });

  it('should return false when javascript throws an error', async () => {
    const result = requirementCustom({
      data: {
        javascript: '{',
        name: 'Custom 1'
      },

      type: 'custom'
    });

    expect(await result).toBe(false);
  });

  it('should return false after 5 seconds when code does not resolve', async () => {
    const result = requirementCustom({
      data: {
        javascript: '',
        name: 'Custom 1'
      },

      type: 'custom'
    });

    jest.advanceTimersByTime(5000);
    expect(await result).toBe(false);
  });

  it('should return false when code resolves falsy', async () => {
    await ['false', 'null', 'undefined', '""', '0', 'NaN'].forEach(
      async (falsy) => {
        const result = requirementCustom({
          data: {
            javascript: `resolve(${falsy})`,
            name: 'Custom 1'
          },

          type: 'custom'
        });

        expect(await result).toBe(false);
      }
    );
  });

  it('should return true when code resolves truthy', async () => {
    await [
      'true',
      '"hello"',
      '123',
      '[]',
      '{}',
      'Infinity',
      'function(){}',
      '() => {}'
    ].forEach(async (truthy) => {
      const result = requirementCustom({
        data: {
          javascript: `resolve(${truthy})`,
          name: 'Custom 1'
        },

        type: 'custom'
      });

      expect(await result).toBe(true);
    });
  });

  it('should return promise resolved true when code resolves promise', async () => {
    const result = requirementCustom({
      data: {
        javascript: 'resolve(new Promise((res) => res(true)))',
        name: 'Custom 1'
      },

      type: 'custom'
    });

    expect(await result).toBe(true);
  });

  it('should return promise resolved false when code resolves promise', async () => {
    const result = requirementCustom({
      data: {
        javascript: 'resolve(new Promise((res) => res(false)))',
        name: 'Custom 1'
      },

      type: 'custom'
    });

    expect(await result).toBe(false);
  });
});
