import type { TypeCampaign, TypeCampaignWithOptionalId, TypeDirection, TypeStatus, TypeTenant } from '../types';

export type TypeApiCampaigns = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; campaignId: TypeCampaign['id'] };
    };
    response: TypeCampaign;
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
      campaigns: TypeCampaign[];
      count: number;
    };
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      body: Omit<TypeCampaignWithOptionalId, 'id'>;
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
