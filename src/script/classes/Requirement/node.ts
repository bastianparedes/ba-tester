import type { TypeBaTester } from '@/script/types';

import Requirement from './index';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementNode = (requirement: TypeRequirementData & { type: 'node' }) =>
  Promise.all(requirement.data.children.map((childData) => new Requirement(childData).evaluate())).then((results) => {
    const fns = Object.freeze({
      and: 'every',
      or: 'some',
    });

    return results[fns[requirement.data.operator]]((result) => result);
  });

export default requirementNode;
