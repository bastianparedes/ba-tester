import comparatorResolver from './comparatorResolver';
import type { ba_tester } from '../../types';
import cookie from '../../utils/cookie';

type RequirementData =
  ba_tester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementCookie = (requirement: RequirementData) => {
  if (requirement.type !== 'cookie')
    throw new Error('Type cookie expected in requirement');
  const cookieValue = cookie.get(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: cookieValue
  });
};

export default requirementCookie;
