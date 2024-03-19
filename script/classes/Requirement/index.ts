import requirementCookie from './cookie';
import requirementCustom from './custom';
import requirementDevice from './device';
import requirementLocalStorage from './localStorage';
import requirementNode from './node';
import requirementQueryParam from './queryParam';
import requirementSessionStorage from './sessionStorage';
import requirementUrl from './url';
import commonConstants from '../../../config/common/constants';
import type { ba_tester } from '../../types';

type RequirementData =
  ba_tester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementSpecific = {
  cookie: requirementCookie,
  custom: requirementCustom,
  device: requirementDevice,
  localStorage: requirementLocalStorage,
  queryParam: requirementQueryParam,
  sessionStorage: requirementSessionStorage,
  url: requirementUrl
};

class Requirement {
  readonly requirementData: RequirementData;

  constructor(requirementData: RequirementData) {
    this.requirementData = requirementData;
  }

  async evaluate(): Promise<boolean> {
    const { requirementData } = this;
    if (requirementData.type === commonConstants.requirementTypes.node)
      return requirementNode(requirementData);

    const fn = requirementSpecific[requirementData.type];
    return fn(requirementData);
  }
}

export default Requirement;
