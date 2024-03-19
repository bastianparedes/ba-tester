import comparatorResolver from './comparatorResolver';
import type { ba_tester } from '../../types';

type RequirementData =
  ba_tester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementSessionStorage = (requirement: RequirementData) => {
  if (requirement.type !== 'sessionStorage')
    throw new Error('Type sessionStorage expected in requirement');
  const keyValue = sessionStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue
  });
};

export default requirementSessionStorage;
