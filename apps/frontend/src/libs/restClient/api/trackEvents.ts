import type { TypeApiTrackEvents } from '@/domain/api/trackEvents';
import { fetchers } from '../fetcher';

export const trackEvents = {
  create: async (data: TypeApiTrackEvents['create']['request']) => {
    const response = await fetchers.post<TypeApiTrackEvents['create']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/track-events`,
    });
    return response;
  },
  delete: async (data: TypeApiTrackEvents['delete']['request']) => {
    const response = await fetchers.delete<TypeApiTrackEvents['delete']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/track-events/${data.pathParams.trackEventId}`,
    });
    return response;
  },
  get: async (data: TypeApiTrackEvents['get']['request']) => {
    const response = await fetchers.get<TypeApiTrackEvents['get']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/track-events/${data.pathParams.trackEventId}`,
    });
    return response;
  },
  getMany: async (data: TypeApiTrackEvents['getMany']['request']) => {
    const response = await fetchers.get<TypeApiTrackEvents['getMany']['response']>({
      headers: data.headers,
      queryParams: data.queryParams,
      url: `/tenants/${data.pathParams.tenantId}/track-events`,
    });
    return response;
  },
  update: async (data: TypeApiTrackEvents['update']['request']) => {
    const response = await fetchers.put<TypeApiTrackEvents['update']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/track-events/${data.pathParams.trackEventId}`,
    });
    return response;
  },
};
