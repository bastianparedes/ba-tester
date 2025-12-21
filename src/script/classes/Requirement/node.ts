import { type TypeNodeRequirement } from '@/types/db/requirement';

import Requirement from '.';

const requirementNode = (requirement: TypeNodeRequirement) =>
  Promise.all(requirement.data.children.map((childData) => new Requirement(childData).evaluate())).then((results) => {
    const fns = Object.freeze({
      and: 'every',
      or: 'some',
    });

    return results[fns[requirement.data.operator]]((result) => result);
  });

export default requirementNode;
