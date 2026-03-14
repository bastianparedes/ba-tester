import type { TypeCampaign, TypeCampaignForExecutionGroup } from '../types/campaign';
import type { TypeDirection } from '../types/constants';
import type { TypeExecutionGroup, TypeExecutionGroupForMenu, TypeOrderExecutionGroupsBy } from '../types/executionGroup';
import type { TypeTenant } from '../types/tenant';

export type TypeApiExecutionGroups = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
    };
    response: {
      executionGroup: TypeExecutionGroup;
      campaigns: TypeCampaignForExecutionGroup[];
    };
  };
  getMany: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      queryParams: {
        textSearch: string;
        orderBy: TypeOrderExecutionGroupsBy;
        orderDirection: TypeDirection;
        page: number;
        quantity: number;
        statusList: TypeExecutionGroup['status'][];
      };
    };
    response: {
      executionGroups: (TypeExecutionGroupForMenu & { campaignsCount: number })[];
      count: number;
    };
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      body: Omit<Omit<Omit<Omit<TypeExecutionGroup, 'id'>, 'createdAt'>, 'updatedAt'>, 'tenantId'> & { campaignIds: TypeCampaign['id'][] };
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
      body: Omit<Omit<Omit<Omit<TypeExecutionGroup, 'id'>, 'createdAt'>, 'updatedAt'>, 'tenantId'> & { campaignIds: TypeCampaign['id'][] };
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
