const constants = {
  pages: {
    account: () => '/admin/account',
    campaign: ({ tenantId, campaignId }: { tenantId: number; campaignId: number | undefined }) => `/tenants/${tenantId}/campaigns/${campaignId}`,
    campaigns: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/campaigns`,
    executionGroup: ({ tenantId, executionGroupId }: { tenantId: number; executionGroupId: number | undefined }) =>
      `/tenants/${tenantId}/execution-groups/${executionGroupId}`,
    executionGroups: ({ tenantId }: { tenantId: number }) => `/tenants/${tenantId}/execution-groups`,
    home: () => '/',
    logIn: () => '/auth/log-in',
    playground: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/playground`,
    playgroundEmbed: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/playground/embed`,
    roles: () => '/admin/roles',
    script: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/script`,
    tenants: () => '/tenants',
    users: () => '/admin/users',
  },
} as const;

export default constants;
