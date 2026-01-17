import type { TypeApiCampaigns } from '@/domain/api/campaigns';
import { fetchers } from '../fetcher';

export const campaigns = {
  getMany: async (data: TypeApiCampaigns['getMany']['request']) => {
    const response = await fetchers.get<TypeApiCampaigns['getMany']['response']>({
      url: `/tenants/${data.pathParams.tenantId}/campaigns`,
      queryParams: data.queryParams,
    });
    return response;
  },
  create: async (data: TypeApiCampaigns['create']['request']) => {
    const response = await fetchers.post<TypeApiCampaigns['create']['response']>({
      url: `/tenants/${data.pathParams.tenantId}/campaigns`,
      body: data.body,
    });
    return response;
  },
  update: async (data: TypeApiCampaigns['update']['request']) => {
    const response = await fetchers.put<TypeApiCampaigns['update']['response']>({
      url: `/tenants/${data.pathParams.tenantId}/campaigns/${data.pathParams.campaignId}`,
      body: data.body,
    });
    return response;
  },
  delete: async (data: TypeApiCampaigns['delete']['request']) => {
    const response = await fetchers.delete<TypeApiCampaigns['delete']['response']>({
      url: `/tenants/${data.pathParams.tenantId}/campaigns/${data.pathParams.campaignId}`,
    });
    return response;
  },
};
