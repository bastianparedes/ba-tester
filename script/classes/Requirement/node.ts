import type { ba_tester } from '../../types';

import Requirement from './index';

type RequirementData = ba_tester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementNode = (requirement: RequirementData & { type: 'node' }) =>
  Promise.all(
    requirement.data.children.map((childData) =>
      new Requirement(childData).evaluate()
    )
  ).then((results) => {
    const fns = Object.freeze({
      and: 'every',
      or: 'some'
    });

    return results[fns[requirement.data.operator]]((result) => result);
  });

export default requirementNode;
