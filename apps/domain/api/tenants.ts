import type { TypeTenant } from '../types';

export type TypeApiTenants = {
  getAll: {
    request: {
      headers?: RequestInit['headers'];
    };
    response: TypeTenant[];
  };
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
    };
    response: TypeTenant;
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      body: {
        name: TypeTenant['name'];
        description: TypeTenant['description'];
        domain: TypeTenant['domain'];
      };
    };
    response: TypeTenant;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      body: {
        name: TypeTenant['name'];
        description: TypeTenant['description'];
        domain: TypeTenant['domain'];
      };
    };
    response: TypeTenant;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
    };
    response: TypeTenant;
  };
};
