type TypeObtainedValue = string | number | null | undefined;
type TypeExpectedValue = string | number | undefined;

const strategyAtLeast = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'number' &&
  typeof expectedValue === 'number' &&
  obtainedValue >= expectedValue;

const strategyAtMost = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'number' &&
  typeof expectedValue === 'number' &&
  obtainedValue <= expectedValue;

const strategyExactly = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'number' &&
  typeof expectedValue === 'number' &&
  obtainedValue === expectedValue;

const strategyLessThan = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'number' &&
  typeof expectedValue === 'number' &&
  obtainedValue < expectedValue;

const strategyMoreThan = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'number' &&
  typeof expectedValue === 'number' &&
  obtainedValue > expectedValue;

const strategyContains = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'string' &&
  typeof expectedValue === 'string' &&
  obtainedValue.includes(expectedValue);

const strategyDoesNotContain = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'string' &&
  typeof expectedValue === 'string' &&
  !obtainedValue.includes(expectedValue);

const strategyIs = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'string' &&
  typeof expectedValue === 'string' &&
  obtainedValue === expectedValue;

const strategyIsNot = ({
  obtainedValue,
  expectedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue: TypeExpectedValue;
}) =>
  typeof obtainedValue === 'string' &&
  typeof expectedValue === 'string' &&
  obtainedValue !== expectedValue;

const strategyDoesNotExist = ({
  obtainedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue?: never;
}) => obtainedValue === null || obtainedValue === undefined;

const strategyExists = ({
  obtainedValue,
}: {
  obtainedValue: TypeObtainedValue;
  expectedValue?: never;
}) => obtainedValue !== null && obtainedValue !== undefined;

export const comparatorResolver = (
  data:
    | {
        comparator: 'atLeast' | 'atMost' | 'exactly' | 'lessThan' | 'moreThan';
        obtainedValue: number;
        expectedValue: number;
      }
    | {
        comparator:
          | 'contains'
          | 'doesNotContain'
          | 'is'
          | 'isNot'
          | 'doesNotExist'
          | 'exists';
        obtainedValue: string | null | undefined;
        expectedValue: string | undefined;
      },
) => {
  const strategies = {
    atLeast: () =>
      strategyAtLeast({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    atMost: () =>
      strategyAtMost({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    contains: () =>
      strategyContains({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    doesNotContain: () =>
      strategyDoesNotContain({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    doesNotExist: () =>
      strategyDoesNotExist({ obtainedValue: data.obtainedValue }),
    exactly: () =>
      strategyExactly({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    exists: () => strategyExists({ obtainedValue: data.obtainedValue }),
    is: () =>
      strategyIs({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    isNot: () =>
      strategyIsNot({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    lessThan: () =>
      strategyLessThan({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
    moreThan: () =>
      strategyMoreThan({
        obtainedValue: data.obtainedValue,
        expectedValue: data.expectedValue,
      }),
  };
  const strategy = strategies[data.comparator];
  const result = strategy();
  return result;
};
