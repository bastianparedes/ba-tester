import comparatorResolver from './comparatorResolver';
import type { TypeBaTester } from '@/script/types';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementLocalStorage = (requirement: TypeRequirementData) => {
  if (requirement.type !== 'localStorage') throw new Error('Type localStorage expected in requirement');
  const keyValue = localStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

export default requirementLocalStorage;
