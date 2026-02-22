const constants = Object.freeze({
  pages: {
    home: () => '/',
    tenants: () => '/tenants',
    executionGroups: ({ tenantId }: { tenantId: number }) => `/tenants/${tenantId}/execution-groups`,
    campaign: ({ tenantId, campaignId }: { tenantId: number; campaignId: number | undefined }) => `/tenants/${tenantId}/campaigns/${campaignId}`,
    campaigns: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/campaigns`,
    playground: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/playground`,
    playgroundEmbed: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/playground/embed`,
    script: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/script`,
    roles: () => '/admin/roles',
    users: () => '/admin/users',
    logIn: () => '/auth/log-in',
  },
} as const);

export default constants;
