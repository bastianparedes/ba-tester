import { comparatorResolver } from './comparatorResolver';
import { type TypeUrlRequirement } from '@/types/db/requirement';

const requirementUrl = (requirement: TypeUrlRequirement) => {
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: location.href,
  });
};

export default requirementUrl;
