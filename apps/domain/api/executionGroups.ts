import type { TypeCampaign, TypeCampaignLight } from '../types/campaign';
import type { TypeDirection } from '../types/constants';
import type { TypeExecutionGroup } from '../types/executionGroup';
import type { TypeTenant } from '../types/tenant';

export type TypeApiExecutionGroups = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
    };
    response: {
      executionGroup: TypeExecutionGroup;
      campaigns: TypeCampaignLight[];
    };
  };
  getMany: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      queryParams: {
        textSearch: string;
        orderBy: 'name' | 'id';
        orderDirection: TypeDirection;
        page: number;
        quantity: number;
      };
    };
    response: {
      executionGroups: (TypeExecutionGroup & { campaignsCount: number })[];
      count: number;
    };
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      body: Omit<Omit<TypeExecutionGroup, 'id'>, 'tenantId'> & { campaignIds: TypeCampaign['id'][] };
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
      body: Omit<Omit<TypeExecutionGroup, 'id'>, 'tenantId'> & { campaignIds: TypeCampaign['id'][] };
    };
    response: Record<string, never>;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
    };
    response: Record<string, never>;
  };
};
