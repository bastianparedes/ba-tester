import type { TypeTenant } from '../types/tenant';

export type TypeApiScripts = {
  get: {
    request: {
      pathParams: { tenantId: TypeTenant['id'] };
    };
    response: string;
  };
};
