const constants = Object.freeze({
  pages: {
    home: () => '/',
    tenants: () => '/tenants',
    campaign: ({ tenantId, campaignId }: { tenantId: number; campaignId: number | undefined }) => `/tenants/${tenantId}/campaigns/${campaignId}`,
    campaigns: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/campaigns`,
    example: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/example`,
    script: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/script`,
    roles: () => '/admin/roles',
    users: () => '/admin/users',
    logIn: () => '/auth/log-in',
  },
} as const);

export default constants;
