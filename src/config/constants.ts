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
    home: () => '/',
    tenants: () => '/tenants',
    bundle: ({ tenantId }: { tenantId: number }) =>
      `/api/tenants/${tenantId}/public/script`,
    campaign: ({
      tenantId,
      campaignId,
    }: {
      tenantId: number;
      campaignId: number | undefined;
    }) => `/tenants/${tenantId}/campaigns/${campaignId}`,
    campaigns: ({ tenantId }: { tenantId: number }) =>
      `/tenants/${tenantId}/campaigns`,
    example: ({ tenantId }: { tenantId: number }) =>
      `/tenants/${tenantId}/example`,
    roles: () => '/admin/roles',
    users: () => '/admin/users',
    logIn: () => '/auth/log-in',
  },
  quantitiesAvailable: [25, 50, 100, 200, 500] as number[],
  cookieNames: {
    lang: 'lang',
    token: 'token',
  },
  superAdminRoleName: 'Super Admin',
} as const);

export default constants;
