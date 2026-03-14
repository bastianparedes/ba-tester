import type { TypeCampaign, TypeCampaignForExecutionGroup, TypeCampaignForMenu, TypeCampaignWithOptionalId, TypeOrderCampaignsBy } from '../types/campaign';
import type { TypeDirection } from '../types/constants';
import type { TypeExecutionGroup } from '../types/executionGroup';
import type { TypeTenant } from '../types/tenant';

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
        orderBy: TypeOrderCampaignsBy;
        orderDirection: TypeDirection;
        page: number;
        quantity: number;
        statusList: TypeCampaign['status'][];
      };
    };
    response: {
      campaigns: (TypeCampaignForMenu & { executionGroup: TypeExecutionGroup | null })[];
      count: number;
    };
  };
  getAllForExecutionGroup: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
    };
    response: {
      campaigns: TypeCampaignForExecutionGroup[];
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
    response: Record<string, never>;
  };
};
