import requirementCookie from './cookie';
import requirementCustom from './custom';
import requirementDevice from './device';
import requirementLocalStorage from './localStorage';
import requirementNode from './node';
import requirementQueryParam from './queryParam';
import requirementSessionStorage from './sessionStorage';
import requirementUrl from './url';
import commonConstants from '../../../config/common/constants';
import type { TypeBaTester } from '@/script/types';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementSpecific = {
  cookie: requirementCookie,
  custom: requirementCustom,
  device: requirementDevice,
  localStorage: requirementLocalStorage,
  queryParam: requirementQueryParam,
  sessionStorage: requirementSessionStorage,
  url: requirementUrl,
};

class Requirement {
  readonly requirementData: TypeRequirementData;

  constructor(requirementData: TypeRequirementData) {
    this.requirementData = requirementData;
  }

  async evaluate(): Promise<boolean> {
    const { requirementData } = this;
    if (requirementData.type === commonConstants.requirementTypes.node) return requirementNode(requirementData);

    const fn = requirementSpecific[requirementData.type];
    return fn(requirementData);
  }
}

export default Requirement;
