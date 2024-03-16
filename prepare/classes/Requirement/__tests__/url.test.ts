import requirementUrl from '../url';

describe('url', () => {
  // "is" | "isNot" | "contains" | "doesNotContain
  const url = 'https://www.bastianparedes.com/campaigns/campaign?id=1';

  it('should trhow error when type is wrong', () => {
    expect(() =>
      requirementUrl({
        data: {
          comparator: 'is',
          value: 'https://www.bastianparedes.com'
        },

        type: '' as 'url'
      })
    ).toThrow();
  });

  it('is (true)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'is',
          value: url
        },

        type: 'url'
      })
    ).toBe(true);
  });

  it('is (false)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'is',
          value: 'https://www.bastianparedes.com/audiences'
        },

        type: 'url'
      })
    ).toBe(false);
  });

  it('isNot (true)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'isNot',
          value: 'https://www.bastianparedes.com/auddiences/audience'
        },

        type: 'url'
      })
    ).toBe(true);
  });

  it('isNot (false)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'isNot',
          value: url
        },

        type: 'url'
      })
    ).toBe(false);
  });

  it('contains (true)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'contains',
          value: 'https://www.bastianparedes.com/campaigns/campaign'
        },

        type: 'url'
      })
    ).toBe(true);
  });

  it('contains (false)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'contains',
          value: 'https://www.bastianparedes.com/campaigns/campaign?id=3'
        },

        type: 'url'
      })
    ).toBe(false);
  });

  it('doesNotContain (true)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'doesNotContain',
          value: 'https://www.bastianparedes.com/campaigns/campaign?group=2'
        },

        type: 'url'
      })
    ).toBe(true);
  });

  it('doesNotContain (false)', () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: url
      },
      writable: true
    });

    expect(
      requirementUrl({
        data: {
          comparator: 'doesNotContain',
          value: 'https://www.bastianparedes.com'
        },

        type: 'url'
      })
    ).toBe(false);
  });
});
