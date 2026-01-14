import type { TypeRequirementData } from './requirement';
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

export type TypeStatus = 'active' | 'inactive' | 'deleted';
export type TypeOrderDirection = 'asc' | 'desc';

export type TypeVariationData = {
  css: string;
  html: string;
  id: number;
  javascript: string;
  name: string;
  traffic: number;
};

export type TypeOrderBy = 'name' | 'id' | 'status';
export type TypeCampaign = {
  id: number | undefined;
  tenantId: number;
  name: string;
  status: TypeStatus;
  triggers: TypeTriggerData[];
  requirements: TypeRequirementData & {
    type: 'node';
  };
  variations: TypeVariationData[];
};

export type TypeCampaignScript = {
  id: number;
  name: string;
  triggers: TypeTriggerData[];
  requirements: TypeRequirementData & {
    type: 'node';
  };
  variations: TypeVariationData[];
};

export type { TypeTriggerData, TypeRequirementData };
