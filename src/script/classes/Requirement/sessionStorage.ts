import { comparatorResolver } from './comparatorResolver';
import { type TypeSessionStorageRequirement } from '@/types/db/requirement';

const requirementSessionStorage = (requirement: TypeSessionStorageRequirement) => {
  const keyValue = sessionStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

export default requirementSessionStorage;
