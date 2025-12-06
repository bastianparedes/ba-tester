import comparatorResolver from './comparatorResolver';
import type { TypeBaTester } from '@/script/types';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementSessionStorage = (requirement: TypeRequirementData) => {
  if (requirement.type !== 'sessionStorage') throw new Error('Type sessionStorage expected in requirement');
  const keyValue = sessionStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

export default requirementSessionStorage;
