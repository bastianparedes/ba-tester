const constants = {
  pages: {
    account: () => '/admin/account',
    campaign: ({ tenantId, campaignId, cloneFrom }: { tenantId: number; campaignId: number | undefined; cloneFrom?: number }) => {
      const basePath = `/tenants/${tenantId}/campaigns/${campaignId}`;
      const queryParams = cloneFrom !== undefined ? `?cloneFrom=${cloneFrom}` : '';
      return basePath + queryParams;
    },
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
    trackEvent: ({ tenantId, trackEventId, cloneFrom }: { tenantId: number; trackEventId: number | undefined; cloneFrom?: number }) => {
      const basePath = `/tenants/${tenantId}/track-events/${trackEventId}`;
      const queryParams = cloneFrom !== undefined ? `?cloneFrom=${cloneFrom}` : '';
      return basePath + queryParams;
    },
    trackEvents: ({ tenantId }: { tenantId: number | string }) => `/tenants/${tenantId}/track-events`,
    users: () => '/admin/users',
  },
} as const;

export default constants;
