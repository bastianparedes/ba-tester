import type { TypeNodeRequirement } from './requirement';
import type { TypeTriggerData } from './trigger';

export type TypeRole = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

export type TypeUser = {
  id: string;
  name: string;
  email: string;
  role: TypeRole;
};

export type TypeTenant = {
  id: number;
  name: string;
  description: string;
  domain: string;
};

export type TypeOrderExecutionGroupsBy = 'name' | 'id';
export type TypeExecutionGroupStrategy = 'execute_all' | 'execute_first' | 'execute_random';
export type TypeExecutionGroup = {
  id: number;
  name: string;
  strategy: TypeExecutionGroupStrategy;
  persistCampaignAcrossReloads: boolean;
  tenantId: number;
};
export type TypeExecutionGroupWithOptionalId = Omit<TypeExecutionGroup, 'id'> & { id?: number | undefined };

export type TypeStatus = 'active' | 'inactive' | 'deleted';

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
  tenantId: number;
  executionGroupId: number | null;
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
