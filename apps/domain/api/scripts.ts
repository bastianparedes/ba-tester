import type { TypeTenant } from '../types';

export type TypeApiScripts = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
    };
    response: string;
  };
};
