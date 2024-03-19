import comparatorResolver from './comparatorResolver';
import type { ba_tester } from '../../types';

type RequirementData =
  ba_tester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementUrl = (requirement: RequirementData) => {
  if (requirement.type !== 'url')
    throw new Error('Type url expected in requirement');
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: location.href
  });
};

export default requirementUrl;
