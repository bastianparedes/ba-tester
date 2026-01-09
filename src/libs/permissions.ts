import { flattenObject } from '@/utils/object';

export const permissions = Object.freeze({
  role: {
    read: 'role.read',
    write: 'role.write',
    delete: 'role.delete',
  },
  user: {
    read: 'user.read',
    write: 'user.write',
    delete: 'user.delete',
  },
  tenant: {
    read: 'tenant.read',
    write: 'tenant.write',
    delete: 'tenant.delete',
  },
  campaign: {
    read: 'campaign.read',
    write: 'campaign.write',
    delete: 'campaign.delete',
  },
});

export const flatPermissions = flattenObject(permissions);
