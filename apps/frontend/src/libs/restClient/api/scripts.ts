import type { TypeApiScripts } from '@/domain/api/scripts';
import { fetchers } from '../fetcher';

export const roles = {
  get: async (data: TypeApiScripts['get']['request']) => {
    const response = await fetchers.get<TypeApiScripts['get']['response']>({
      url: `/public/tenants/${data.pathParams.tenantId}`,
      body: data.body,
    });
    return response;
  },
};
