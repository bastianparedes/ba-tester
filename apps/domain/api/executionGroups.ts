import type { TypeCampaign, TypeExecutionGroup, TypeOrderDirection, TypeTenant } from '../types';

export type TypeApiExecutionGroups = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
    };
    response: {
      executionGroup: TypeExecutionGroup & {
        campaigns: TypeCampaign[];
      };
    };
  };
  getMany: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      queryParams: {
        textSearch: string;
        orderBy: 'name' | 'id';
        orderDirection: TypeOrderDirection;
        page: number;
        quantity: number;
      };
    };
    response: {
      executionGroups: TypeExecutionGroup[];
    };
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      body: Omit<TypeExecutionGroup, 'id'>;
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
      body: Omit<TypeExecutionGroup, 'id'>;
    };
    response: Record<string, never>;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] };
    };
    response: never;
  };
};
