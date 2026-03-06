import { TypeTenant } from './tenant';

export type TypeOrderExecutionGroupsBy = 'name' | 'id';

export type TypeExecutionGroup = {
  id: number;
  name: string;
  waitForEveryCampaignToBeEvaluated: boolean;
  onlyOneCampaignPerPageLoad: boolean;
  onlyCampaignsPreviouslyExecuted: boolean;
  tenantId: TypeTenant['id'];
};

export type TypeExecutionGroupUpdatable = Pick<
  TypeExecutionGroup,
  'name' | 'waitForEveryCampaignToBeEvaluated' | 'onlyOneCampaignPerPageLoad' | 'onlyCampaignsPreviouslyExecuted'
>;

export type TypeExecutionGroupWithOptionalId = Omit<TypeExecutionGroup, 'id'> & { id?: number | undefined };
