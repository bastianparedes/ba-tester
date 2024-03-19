import type { ba_tester } from '../../types';

type RequirementData =
  ba_tester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementCustom = (requirement: RequirementData) => {
  if (requirement.type !== 'custom')
    throw new Error('Type custom expected in requirement');

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
