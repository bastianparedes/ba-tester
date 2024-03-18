import comparatorResolver from './comparatorResolver';
import type { ba_tester } from '../../types';
import queryParam from '../../utils/queryParam';

type RequirementData = (
  | ba_tester['audiencesData']
  | ba_tester['campaignsData']
)[number]['requirements']['data']['children'][number];

const requirementQueryParam = (requirement: RequirementData) => {
  if (requirement.type !== 'queryParam')
    throw new Error('Type queryParam expected in requirement');
  const queryParamValue = queryParam.get(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: queryParamValue
  });
};

export default requirementQueryParam;
