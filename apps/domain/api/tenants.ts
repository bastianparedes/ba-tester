import type { TypeTenant } from '../types';

export type TypeApiTenants = {
  getAll: {
    request: {
      body: never;
    };
    response: TypeTenant[];
  };
  create: {
    request: {
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
      pathParams: { tenantId: TypeTenant['id'] };
      body: never;
    };
    response: never;
  };
};
