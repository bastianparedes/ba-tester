import type { TypeApiScripts } from '@digital-retail/ab-tester-types/api/scripts';
import { fetchers } from '../fetcher';

export const scripts = {
  get: async (data: TypeApiScripts['get']['request']) => {
    const response = await fetchers.get<TypeApiScripts['get']['response']>({
      url: `/public/tenants/${data.pathParams.tenantId}/script`,
    });
    return response;
  },
};
