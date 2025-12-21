import { comparatorResolver } from './comparatorResolver';
import queryParam from '@/script/utils/queryParam';
import { type TypeQueryParamRequirement } from '@/types/db/requirement';

const requirementQueryParam = (requirement: TypeQueryParamRequirement) => {
  const queryParamValue = queryParam.get(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: queryParamValue,
  });
};

export default requirementQueryParam;
