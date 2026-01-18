import type { TypeApiTenants } from '@/domain/api/tenants';
import { fetchers } from '../fetcher';

export const tenants = {
  getAll: async (data: TypeApiTenants['getAll']['request']) => {
    const response = await fetchers.get<TypeApiTenants['getAll']['response']>({
      headers: data.headers,
      url: '/tenants',
    });
    return response;
  },
  get: async (data: TypeApiTenants['get']['request']) => {
    const response = await fetchers.get<TypeApiTenants['get']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}`,
    });
    return response;
  },
  create: async (data: TypeApiTenants['create']['request']) => {
    const response = await fetchers.post<TypeApiTenants['create']['response']>({
      url: '/tenants',
      body: data.body,
    });
    return response;
  },
  update: async (data: TypeApiTenants['update']['request']) => {
    const response = await fetchers.put<TypeApiTenants['update']['response']>({
      url: `/tenants/${data.pathParams.tenantId}`,
      body: data.body,
    });
    return response;
  },
  delete: async (data: TypeApiTenants['delete']['request']) => {
    const response = await fetchers.delete<TypeApiTenants['delete']['response']>({
      url: `/tenants/${data.pathParams.tenantId}`,
    });
    return response;
  },
};
