import type { TypeApiUsers } from '@/domain/api/users';
import { fetchers } from '../fetcher';

export const users = {
  create: async (data: TypeApiUsers['create']['request']) => {
    const response = await fetchers.post<TypeApiUsers['create']['response']>({
      body: data.body,
      headers: data.headers,
      url: '/admin/users',
    });
    return response;
  },
  delete: async (data: TypeApiUsers['delete']['request']) => {
    const response = await fetchers.delete<TypeApiUsers['delete']['response']>({
      headers: data.headers,
      url: `/admin/users/${data.pathParams.userId}`,
    });
    return response;
  },
  get: async (data: TypeApiUsers['get']['request']) => {
    const response = await fetchers.get<TypeApiUsers['get']['response']>({
      headers: data.headers,
      url: `/admin/users/user`,
    });
    return response;
  },
  getAll: async (data: TypeApiUsers['getAll']['request']) => {
    const response = await fetchers.get<TypeApiUsers['getAll']['response']>({
      headers: data.headers,
      url: '/admin/users',
    });
    return response;
  },
  update: async (data: TypeApiUsers['update']['request']) => {
    const response = await fetchers.put<TypeApiUsers['update']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/admin/users/${data.pathParams.userId}`,
    });
    return response;
  },
  updateAccount: async (data: TypeApiUsers['updateAccount']['request']) => {
    const response = await fetchers.put<TypeApiUsers['updateAccount']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/account/update-account`,
    });
    return response;
  },
  updatePassword: async (data: TypeApiUsers['updatePassword']['request']) => {
    const response = await fetchers.put<TypeApiUsers['updatePassword']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/account/update-password`,
    });
    return response;
  },
};
