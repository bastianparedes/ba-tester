import { flattenObject } from './utils';

export const permissions = Object.freeze({
  role: {
    read: 'role.read',
    create: 'role.create',
    update: 'role.update',
    delete: 'role.delete',
  },
  user: {
    read: 'user.read',
    create: 'user.create',
    update: 'user.update',
    delete: 'user.delete',
  },
  tenant: {
    read: 'tenant.read',
    create: 'tenant.create',
    update: 'tenant.update',
    delete: 'tenant.delete',
  },
  campaign: {
    read: 'campaign.read',
    create: 'campaign.create',
    update: 'campaign.update',
    delete: 'campaign.delete',
  },
  executionGroup: {
    read: 'execution-group.read',
    create: 'execution-group.create',
    update: 'execution-group.update',
    delete: 'execution-group.delete',
  },
});

export const flatPermissions = flattenObject(permissions);
