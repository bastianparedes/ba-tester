import { flattenObject } from '@/utils/object';

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
  },
});
export const superAdminOnlyPermissions = Object.freeze({
  superAdmin: {
    read: 'superAdmin.read',
    write: 'superAdmin.write',
    delete: 'superAdmin.delete',
  },
});

export const flatPermissions = flattenObject(permissions);
export const flatSuperAdminOnlyPermissions = flattenObject(superAdminOnlyPermissions);
