import comparatorResolver from './comparatorResolver';
import type { TypeBaTester } from '@/script/types';
import queryParam from '@/script/utils/queryParam';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementQueryParam = (requirement: TypeRequirementData) => {
  if (requirement.type !== 'queryParam') throw new Error('Type queryParam expected in requirement');
  const queryParamValue = queryParam.get(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: queryParamValue,
  });
};

export default requirementQueryParam;
