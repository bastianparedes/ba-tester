import { type TypeRequirementData } from './requirement';
import { type TypeTriggerData } from './trigger';

export type TypeStatus = 'inactive' | 'active' | 'deleted';

export type TypeVariationData = {
  css: string;
  html: string;
  readonly id: number;
  javascript: string;
  name: string;
  traffic: number;
};

export type TypeCampaign = {
  readonly id: number | undefined;
  name: string;
  status: TypeStatus;
};

export type TypeCampaignExtended = TypeCampaign & {
  triggers: TypeTriggerData[];
  requirements: TypeRequirementData & {
    type: 'node';
  };
  variations: TypeVariationData[];
};

export type { TypeTriggerData, TypeRequirementData };
