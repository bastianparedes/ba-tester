import { TypeExecutionStrategy } from '.';

export type ExecutionGroup = {
  id: number;
  name: string;
  strategy: TypeExecutionStrategy;
  persistCampaignAcrossReloads: boolean;
  campaignIds: number[];
  tenantId: number;
};
