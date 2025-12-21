import { comparatorResolver } from './comparatorResolver';
import { type TypeLocalStorageRequirement } from '@/types/db/requirement';

const requirementLocalStorage = (requirement: TypeLocalStorageRequirement) => {
  const keyValue = localStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

export default requirementLocalStorage;
