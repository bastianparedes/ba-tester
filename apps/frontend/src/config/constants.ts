import { TypePermissions } from '@/domain/types/permissions';
import { flattenObject } from '../utils/object';

export const permissions: TypePermissions = {
  audience: {
    create: 'audience.create',
    delete: 'audience.delete',
    read: 'audience.read',
    update: 'audience.update',
  },
  campaign: {
    create: 'campaign.create',
    delete: 'campaign.delete',
    read: 'campaign.read',
    update: 'campaign.update',
  },
  executionGroup: {
    create: 'execution-group.create',
    delete: 'execution-group.delete',
    read: 'execution-group.read',
    update: 'execution-group.update',
  },
  role: {
    create: 'role.create',
    delete: 'role.delete',
    read: 'role.read',
    update: 'role.update',
  },
  tenant: {
    create: 'tenant.create',
    delete: 'tenant.delete',
    read: 'tenant.read',
    update: 'tenant.update',
  },
  trackEvent: {
    create: 'track-event.create',
    delete: 'track-event.delete',
    read: 'track-event.read',
    update: 'track-event.update',
  },
  user: {
    create: 'user.create',
    delete: 'user.delete',
    read: 'user.read',
    update: 'user.update',
  },
};
export const flatPermissions = flattenObject(permissions);

const constants = {
  cookieNames: {
    lang: 'lang',
  },
  pages: {
    account: () => '/admin/account',
    audience: ({ tenantId, audienceId }: { tenantId: number; audienceId: number | undefined }) => `/tenants/${tenantId}/audiences/${audienceId}`,
    audiences: ({ tenantId }: { tenantId: number }) => `/tenants/${tenantId}/audiences`,
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
  quantitiesAvailable: [25, 50, 100, 200, 500],
};

export default constants;
