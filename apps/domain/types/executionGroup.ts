import { TypeExecutionStrategy } from './constants';

export type ExecutionGroup = {
  id: number;
  name: string;
  strategy: TypeExecutionStrategy;
  persistCampaignAcrossReloads: boolean;
  campaignIds: number[];
  tenantId: number;
};
