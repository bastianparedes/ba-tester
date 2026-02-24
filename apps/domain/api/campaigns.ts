import type { TypeCampaign, TypeCampaignLight, TypeCampaignWithOptionalId, TypeDirection, TypeExecutionGroup, TypeStatus, TypeTenant } from '../types';

export type TypeApiCampaigns = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; campaignId: TypeCampaign['id'] };
    };
    response: TypeCampaign & { executionGroup: TypeExecutionGroup | null };
  };
  getMany: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      queryParams: {
        textSearch: string;
        orderBy: 'name' | 'id' | 'status';
        orderDirection: TypeDirection;
        page: number;
        quantity: number;
        statusList: TypeStatus[];
      };
    };
    response: {
      campaigns: (TypeCampaignLight & { executionGroup: TypeExecutionGroup | null })[];
      count: number;
    };
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      body: Omit<Omit<TypeCampaignWithOptionalId, 'id'>, 'executionGroupId'>;
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; campaignId: TypeCampaign['id'] };
      body: TypeCampaignWithOptionalId;
    };
    response: Record<string, never>;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; campaignId: TypeCampaign['id'] };
    };
    response: never;
  };
};
