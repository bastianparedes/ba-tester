import type { TypeBaTester } from '@/script/types';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementCustom = (requirement: TypeRequirementData) => {
  if (requirement.type !== 'custom') throw new Error('Type custom expected in requirement');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 5000);

    eval(requirement.data.javascript);
  })
    .then((result) => Boolean(result))
    .catch(() => false);
};

export default requirementCustom;
