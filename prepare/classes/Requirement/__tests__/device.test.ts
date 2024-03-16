import requirementDevice from '../device';

describe('device', () => {
  const setDesktop = () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      },
      writable: true
    });
  };

  const setMobile = () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36'
      },
      writable: true
    });
  };

  it('should trhow error when type is wrong', () => {
    expect(() =>
      requirementDevice({
        data: {
          comparator: 'is',
          device: 'desktop'
        },

        type: '' as 'device'
      })
    ).toThrow();
  });

  it('is desktop (true)', () => {
    setDesktop();
    expect(
      requirementDevice({
        data: {
          comparator: 'is',
          device: 'desktop'
        },

        type: 'device'
      })
    ).toBe(true);
  });

  it('is desktop (false)', () => {
    setMobile();
    expect(
      requirementDevice({
        data: {
          comparator: 'is',
          device: 'desktop'
        },

        type: 'device'
      })
    ).toBe(false);
  });

  it('is mobile (true)', () => {
    setMobile();
    expect(
      requirementDevice({
        data: {
          comparator: 'is',
          device: 'mobile'
        },

        type: 'device'
      })
    ).toBe(true);
  });

  it('is mobile (false)', () => {
    setDesktop();
    expect(
      requirementDevice({
        data: {
          comparator: 'is',
          device: 'mobile'
        },

        type: 'device'
      })
    ).toBe(false);
  });

  it('isNot desktop (false)', () => {
    setDesktop();
    expect(
      requirementDevice({
        data: {
          comparator: 'isNot',
          device: 'desktop'
        },

        type: 'device'
      })
    ).toBe(false);
  });

  it('isNot desktop (true)', () => {
    setMobile();
    expect(
      requirementDevice({
        data: {
          comparator: 'isNot',
          device: 'desktop'
        },

        type: 'device'
      })
    ).toBe(true);
  });

  it('isNot mobile (false)', () => {
    setMobile();
    expect(
      requirementDevice({
        data: {
          comparator: 'isNot',
          device: 'mobile'
        },

        type: 'device'
      })
    ).toBe(false);
  });

  it('isNot mobile (true)', () => {
    setDesktop();
    expect(
      requirementDevice({
        data: {
          comparator: 'isNot',
          device: 'mobile'
        },

        type: 'device'
      })
    ).toBe(true);
  });
});
