import type { TypeTenant } from '../types/tenant';

export type TypeApiScripts = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
    };
    response: string;
  };
};
