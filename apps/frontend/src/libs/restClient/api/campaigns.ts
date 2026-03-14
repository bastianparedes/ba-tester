import type { TypeApiCampaigns } from '@/domain/api/campaigns';
import { fetchers } from '../fetcher';

export const campaigns = {
  create: async (data: TypeApiCampaigns['create']['request']) => {
    const response = await fetchers.post<TypeApiCampaigns['create']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns`,
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
  get: async (data: TypeApiCampaigns['get']['request']) => {
    const response = await fetchers.get<TypeApiCampaigns['get']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns/${data.pathParams.campaignId}`,
    });
    return response;
  },
  getAllForExecutionGroup: async (data: TypeApiCampaigns['getAllForExecutionGroup']['request']) => {
    const response = await fetchers.get<TypeApiCampaigns['getAllForExecutionGroup']['response']>({
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns/getAllForExecutionGroup`,
    });
    return response;
  },
  getMany: async (data: TypeApiCampaigns['getMany']['request']) => {
    const response = await fetchers.get<TypeApiCampaigns['getMany']['response']>({
      headers: data.headers,
      queryParams: data.queryParams,
      url: `/tenants/${data.pathParams.tenantId}/campaigns`,
    });
    return response;
  },
  update: async (data: TypeApiCampaigns['update']['request']) => {
    const response = await fetchers.put<TypeApiCampaigns['update']['response']>({
      body: data.body,
      headers: data.headers,
      url: `/tenants/${data.pathParams.tenantId}/campaigns/${data.pathParams.campaignId}`,
    });
    return response;
  },
};
