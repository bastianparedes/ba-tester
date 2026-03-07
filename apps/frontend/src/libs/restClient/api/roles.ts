import type { TypeApiRoles } from '@/domain/api/roles';
import { fetchers } from '../fetcher';

export const roles = {
  create: async (data: TypeApiRoles['create']['request']) => {
    const response = await fetchers.post<TypeApiRoles['create']['response']>({
      body: data.body,
      headers: data.headers,
      url: '/admin/roles',
    });
    return response;
  },
  delete: async (data: TypeApiRoles['delete']['request']) => {
    const response = await fetchers.delete<TypeApiRoles['delete']['response']>({
      headers: data.headers,
      url: `/admin/roles/${data.pathParams.roleId}`,
    });
    return response;
  },
  getAll: async (data: TypeApiRoles['getAll']['request']) => {
    const response = await fetchers.get<TypeApiRoles['getAll']['response']>({
      headers: data.headers,
      url: '/admin/roles',
    });
    return response;
  },
  update: async (data: TypeApiRoles['update']['request']) => {
    const response = await fetchers.put<TypeApiRoles['update']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/admin/roles/${data.pathParams.roleId}`,
    });
    return response;
  },
};
