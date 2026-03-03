import type { TypeNodeRequirement } from './requirement';
import type { TypeTriggerData } from './trigger';

export type TypeRole = {
  id: number;
  name: string;
  description: string;
  permissions: string[];
};

export type TypeUser = {
  id: number;
  name: string;
  email: string;
  roleId: TypeRole['id'];
  role: TypeRole;
};

export type TypeTenant = {
  id: number;
  name: string;
  description: string;
  domain: string;
};

export type TypeOrderExecutionGroupsBy = 'name' | 'id';
export type TypeExecutionGroup = {
  id: number;
  name: string;
  waitForEveryCampaignToBeEvaluated: boolean;
  onlyOneCampaignPerPageLoad: boolean;
  onlyCampaignsPreviouslyExecuted: boolean;
  tenantId: TypeTenant['id'];
};
export type TypeExecutionGroupWithOptionalId = Omit<TypeExecutionGroup, 'id'> & { id?: number | undefined };

export type TypeStatus = 'active' | 'inactive';

export type TypeVariationData = {
  css: string;
  html: string;
  id: number;
  javascript: string;
  name: string;
  traffic: number;
};

export type TypeOrderCampaignsBy = 'name' | 'id' | 'status';
export type TypeCampaign = {
  id: number;
  name: string;
  status: TypeStatus;
  triggers: TypeTriggerData[];
  requirements: TypeNodeRequirement;
  variations: TypeVariationData[];
  tenantId: TypeTenant['id'];
  executionGroupId: TypeExecutionGroup['id'] | null;
};
export type TypeCampaignWithOptionalId = Omit<TypeCampaign, 'id'> & { id?: number | undefined };
export type TypeCampaignLight = Omit<Omit<Omit<TypeCampaign, 'triggers'>, 'requirements'>, 'variations'>;

export type TypeCampaignScript = {
  id: number;
  name: string;
  triggers: TypeTriggerData[];
  requirements: TypeNodeRequirement;
  variations: TypeVariationData[];
};

export type { TypeTriggerData, TypeNodeRequirement };
export type TypeDirection = 'asc' | 'desc';
export type TypeBooleanOperator = 'and' | 'or';
export type TypeStringComparator = 'contains' | 'doesNotContain' | 'doesNotExist' | 'exists' | 'is' | 'isNot';
export type TypeRequirementType = 'cookie' | 'custom' | 'device' | 'localStorage' | 'node' | 'queryParam' | 'sessionStorage' | 'url';
export type TypeNumericComparator = 'atLeast' | 'atMost' | 'exactly' | 'lessThan' | 'moreThan';
export type TypeRepetition = 'atLeast' | 'atMost' | 'exactly' | 'lessThan' | 'moreThan';
export type TypeLimitType = 'oneDay' | 'oneMonth' | 'oneWeek' | 'session' | 'threeMonths';
export type TypeNodeType = 'internal' | 'root';
export type TypeTriggerType = 'clickOnElement' | 'custom' | 'pageLoad' | 'timeOnPage';
export type TypeDeviceType = 'desktop' | 'mobile';
