import { flattenObject } from '@/utils/object';

export const permissions = Object.freeze({
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
