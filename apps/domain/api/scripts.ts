import type { TypeTenant } from '../types';

export type TypeApiScripts = {
  get: {
    request: {
      pathParams: { tenantId: TypeTenant['id'] };
      body: never;
    };
    response: string;
  };
};
