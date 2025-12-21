import requirementCookie from './cookie';
import requirementCustom from './custom';
import requirementDevice from './device';
import requirementLocalStorage from './localStorage';
import requirementNode from './node';
import requirementQueryParam from './queryParam';
import requirementSessionStorage from './sessionStorage';
import requirementUrl from './url';
import type { TypeRequirementData } from '@/types/db/requirement';

class Requirement {
  readonly requirementData: TypeRequirementData;

  constructor(requirementData: TypeRequirementData) {
    this.requirementData = requirementData;
  }

  async evaluate(): Promise<boolean> {
    if (this.requirementData.type === 'cookie') return requirementCookie(this.requirementData);
    if (this.requirementData.type === 'custom') return requirementCustom(this.requirementData);
    if (this.requirementData.type === 'device') return requirementDevice(this.requirementData);
    if (this.requirementData.type === 'localStorage') return requirementLocalStorage(this.requirementData);
    if (this.requirementData.type === 'queryParam') return requirementQueryParam(this.requirementData);
    if (this.requirementData.type === 'sessionStorage') return requirementSessionStorage(this.requirementData);
    if (this.requirementData.type === 'url') return requirementUrl(this.requirementData);
    if (this.requirementData.type === 'node') return requirementNode(this.requirementData);
    return false;
  }
}

export default Requirement;
