const constants = Object.freeze({
  api: {
    campaign: {
      read: '/api/campaign/read',
      upsert: '/api/campaign/upsert',
    },
  },
  database: {
    campaign: {
      id: 'id',
      name: 'name',
      requirements: 'requirements',
      status: 'status',
      variations: 'variations',
    },
    order: {
      asc: 'asc',
      desc: 'desc',
    },
  },
  pages: {
    tenants: () => '/tenants',
    bundle: ({ tenantId }: { tenantId: number }) => `/api/tenants/${tenantId}/public/script`,
    campaign: ({ tenantId, campaignId }: { tenantId: number; campaignId: number | undefined }) =>
      `/tenants/${tenantId}/campaigns/${campaignId}`,
    campaigns: ({ tenantId }: { tenantId: number }) => `/tenants/${tenantId}/campaigns`,
    example: ({ tenantId }: { tenantId: number }) => `/tenants/${tenantId}/example`,
    roles: () => '/roles',
    users: () => '/users',
  },
  quantitiesAvailable: [25, 50, 100, 200, 500] as number[],
} as const);

export default constants;
