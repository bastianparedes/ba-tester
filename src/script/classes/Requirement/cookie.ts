import comparatorResolver from './comparatorResolver';
import type { TypeBaTester } from '@/script/types';
import cookie from '@/script/utils/cookie';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementCookie = (requirement: TypeRequirementData) => {
  if (requirement.type !== 'cookie') throw new Error('Type cookie expected in requirement');
  const cookieValue = cookie.get({ name: requirement.data.name });
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: cookieValue,
  });
};

export default requirementCookie;
