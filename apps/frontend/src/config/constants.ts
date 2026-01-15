const constants = Object.freeze({
  pages: {
    home: () => '/',
    tenants: () => '/tenants',
    campaign: ({ tenantId, campaignId }: { tenantId: number; campaignId: number | undefined }) => `/tenants/${tenantId}/campaigns/${campaignId}`,
    campaigns: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/campaigns`,
    example: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/example`,
    script: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/script`,
    apiScript: ({ tenantId }: { tenantId: number | string }) => `/api/public/script/${tenantId}`,
    roles: () => '/admin/roles',
    users: () => '/admin/users',
    logIn: () => '/auth/log-in',
  },
  quantitiesAvailable: [25, 50, 100, 200, 500] as number[],
} as const);

export default constants;
