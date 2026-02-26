import type { TypeApiCampaigns } from '@/domain/api/campaigns';
import { fetchers } from '../fetcher';

export const campaigns = {
  getMany: async (data: TypeApiCampaigns['getMany']['request']) => {
    const response = await fetchers.get<TypeApiCampaigns['getMany']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns`,
      queryParams: data.queryParams,
    });
    return response;
  },
  getAllLight: async (data: TypeApiCampaigns['getAllLight']['request']) => {
    const response = await fetchers.get<TypeApiCampaigns['getAllLight']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns/getAllLight`,
    });
    return response;
  },
  get: async (data: TypeApiCampaigns['get']['request']) => {
    const response = await fetchers.get<TypeApiCampaigns['get']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns/${data.pathParams.campaignId}`,
    });
    return response;
  },
  create: async (data: TypeApiCampaigns['create']['request']) => {
    const response = await fetchers.post<TypeApiCampaigns['create']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns`,
      body: data.body,
    });
    return response;
  },
  update: async (data: TypeApiCampaigns['update']['request']) => {
    const response = await fetchers.put<TypeApiCampaigns['update']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns/${data.pathParams.campaignId}`,
      body: data.body,
    });
    return response;
  },
  delete: async (data: TypeApiCampaigns['delete']['request']) => {
    const response = await fetchers.delete<TypeApiCampaigns['delete']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns/${data.pathParams.campaignId}`,
    });
    return response;
  },
};
