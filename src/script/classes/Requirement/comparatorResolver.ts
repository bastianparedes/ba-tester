type obtainedValue = string | number | null | undefined;
type expectedValue = string | number | undefined;

const atLeast = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'number' && typeof expectedValue === 'number' && obtainedValue >= expectedValue;

const atMost = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'number' && typeof expectedValue === 'number' && obtainedValue <= expectedValue;

const exactly = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'number' && typeof expectedValue === 'number' && obtainedValue === expectedValue;

const lessThan = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'number' && typeof expectedValue === 'number' && obtainedValue < expectedValue;

const moreThan = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'number' && typeof expectedValue === 'number' && obtainedValue > expectedValue;

const contains = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'string' && typeof expectedValue === 'string' && obtainedValue.includes(expectedValue);

const doesNotContain = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'string' && typeof expectedValue === 'string' && !obtainedValue.includes(expectedValue);

const is = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'string' && typeof expectedValue === 'string' && obtainedValue === expectedValue;

const isNot = (obtainedValue: obtainedValue, expectedValue: expectedValue) =>
  typeof obtainedValue === 'string' && typeof expectedValue === 'string' && obtainedValue !== expectedValue;

const doesNotExist = (obtainedValue: obtainedValue) => obtainedValue === null || obtainedValue === undefined;

const exists = (obtainedValue: obtainedValue) => obtainedValue !== null && obtainedValue !== undefined;

export const comparatorResolver = (
  data:
    | {
        comparator: 'atLeast' | 'atMost' | 'exactly' | 'lessThan' | 'moreThan';
        obtainedValue: number;
        expectedValue: number;
      }
    | {
        comparator: 'contains' | 'doesNotContain' | 'is' | 'isNot' | 'doesNotExist' | 'exists';
        obtainedValue: string | null | undefined;
        expectedValue: string | undefined;
      },
) => {
  const fns = {
    atLeast,
    atMost,
    contains,
    doesNotContain,
    doesNotExist,
    exactly,
    exists,
    is,
    isNot,
    lessThan,
    moreThan,
  };

  const fn = fns[data.comparator];
  return fn(data.obtainedValue, data.expectedValue);
};
