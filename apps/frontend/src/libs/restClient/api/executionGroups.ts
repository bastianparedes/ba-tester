import type { TypeApiExecutionGroups } from '@/domain/api/executionGroups';
import { fetchers } from '../fetcher';

export const executionGroups = {
  getMany: async (data: TypeApiExecutionGroups['getMany']['request']) => {
    const response = await fetchers.get<TypeApiExecutionGroups['getMany']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/execution-groups`,
      queryParams: data.queryParams,
    });
    return response;
  },
  get: async (data: TypeApiExecutionGroups['get']['request']) => {
    const response = await fetchers.get<TypeApiExecutionGroups['get']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/execution-groups/${data.pathParams.executionGroupId}`,
    });
    return response;
  },
  create: async (data: TypeApiExecutionGroups['create']['request']) => {
    const response = await fetchers.post<TypeApiExecutionGroups['create']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/execution-groups`,
      body: data.body,
    });
    return response;
  },
  update: async (data: TypeApiExecutionGroups['update']['request']) => {
    const response = await fetchers.put<TypeApiExecutionGroups['update']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/execution-groups/${data.pathParams.executionGroupId}`,
      body: data.body,
    });
    return response;
  },
  delete: async (data: TypeApiExecutionGroups['delete']['request']) => {
    const response = await fetchers.delete<TypeApiExecutionGroups['delete']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/execution-groups/${data.pathParams.executionGroupId}`,
    });
    return response;
  },
};
