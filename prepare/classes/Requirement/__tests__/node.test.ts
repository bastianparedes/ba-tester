import requirementNode from '../node';

describe('node', () => {
  const resolveFalse = 'resolve(false);';
  const resolveTrue = 'resolve(true);';

  it('true and ( true or true ) === true', async () => {
    const result = requirementNode({
      data: {
        children: [
          {
            data: {
              javascript: resolveTrue,
              name: 'Custom 1'
            },
            type: 'custom'
          },
          {
            data: {
              children: [
                {
                  data: {
                    javascript: resolveTrue,
                    name: 'Custom 2'
                  },
                  type: 'custom'
                },
                {
                  data: {
                    javascript: resolveTrue,
                    name: 'Custom 3'
                  },
                  type: 'custom'
                }
              ],
              operator: 'or'
            },
            type: 'node'
          }
        ],
        operator: 'and'
      },
      type: 'node'
    });

    expect(await result).toBe(true);
  });

  it('true and ( true or false ) === true', async () => {
    const result = requirementNode({
      data: {
        children: [
          {
            data: {
              javascript: resolveTrue,
              name: 'Custom 1'
            },
            type: 'custom'
          },
          {
            data: {
              children: [
                {
                  data: {
                    javascript: resolveTrue,
                    name: 'Custom 2'
                  },
                  type: 'custom'
                },
                {
                  data: {
                    javascript: resolveFalse,
                    name: 'Custom 3'
                  },
                  type: 'custom'
                }
              ],
              operator: 'or'
            },
            type: 'node'
          }
        ],
        operator: 'and'
      },
      type: 'node'
    });

    expect(await result).toBe(true);
  });

  it('false and ( true or false ) === false', async () => {
    const result = requirementNode({
      data: {
        children: [
          {
            data: {
              javascript: resolveFalse,
              name: 'Custom 1'
            },
            type: 'custom'
          },
          {
            data: {
              children: [
                {
                  data: {
                    javascript: resolveTrue,
                    name: 'Custom 2'
                  },
                  type: 'custom'
                },
                {
                  data: {
                    javascript: resolveFalse,
                    name: 'Custom 3'
                  },
                  type: 'custom'
                }
              ],
              operator: 'or'
            },
            type: 'node'
          }
        ],
        operator: 'and'
      },
      type: 'node'
    });

    expect(await result).toBe(false);
  });
});
