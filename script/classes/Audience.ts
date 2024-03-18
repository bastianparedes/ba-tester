import Requirement from './Requirement';
import type { ba_tester } from '../types';

type RequirementData = ba_tester['audiencesData'][number]['requirements'];

class Audience {
  requirementDatas: RequirementData;

  constructor(requirementDatas: RequirementData) {
    this.requirementDatas = requirementDatas;
  }

  async evaluate() {
    if (this.requirementDatas.data.children.length === 0) return false;
    return new Requirement(this.requirementDatas).evaluate();
  }
}

export default Audience;
