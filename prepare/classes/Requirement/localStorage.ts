import comparatorResolver from './comparatorResolver';
import type { ba_tester } from '../../types';

type RequirementData = (
  | ba_tester['audiencesData']
  | ba_tester['campaignsData']
)[number]['requirements']['data']['children'][number];

const requirementLocalStorage = (requirement: RequirementData) => {
  if (requirement.type !== 'localStorage')
    throw new Error('Type localStorage expected in requirement');
  const keyValue = localStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue
  });
};

export default requirementLocalStorage;
