import constants from '@/config/constants';

import { cookies } from 'next/headers';
import db from '@/libs/db/mongodb';
import { getTokenData } from '@/libs/auth/jwt';
import { getUserPermissions, getIsUserSuperAdmin, type TypeFullUser } from './helper';

export const getUserFromCookies = async (): Promise<TypeFullUser> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(constants.cookieNames.token)?.value;
  if (!token)
    return {
      isLogedIn: false,
      data: null,
      isSuperAdmin: false,
      rawPermissions: [],
      permissions: {
        canReadRole: false,
        canCreateRole: false,
        canUpdateRole: false,
        canDeleteRole: false,

        canReadUser: false,
        canCreateUser: false,
        canUpdateUser: false,
        canDeleteUser: false,

        canReadTenant: false,
        canCreateTenant: false,
        canUpdateTenant: false,
        canDeleteTenant: false,

        canReadCampaign: false,
        canCreateCampaign: false,
        canUpdateCampaign: false,

        canCreateSuperAdmin: false,
        canUpdateSuperAdmin: false,
        canDeleteSuperAdmin: false,
      },
    };

  const tokenData = getTokenData({ token, purpose: 'session' });
  if (!tokenData.valid)
    return {
      isLogedIn: false,
      data: null,
      isSuperAdmin: false,
      rawPermissions: [],
      permissions: {
        canReadRole: false,
        canCreateRole: false,
        canUpdateRole: false,
        canDeleteRole: false,

        canReadUser: false,
        canCreateUser: false,
        canUpdateUser: false,
        canDeleteUser: false,

        canReadTenant: false,
        canCreateTenant: false,
        canUpdateTenant: false,
        canDeleteTenant: false,

        canReadCampaign: false,
        canCreateCampaign: false,
        canUpdateCampaign: false,

        canCreateSuperAdmin: false,
        canUpdateSuperAdmin: false,
        canDeleteSuperAdmin: false,
      },
    };

  const user = await db.users.get({ userId: tokenData.id });
  if (!user)
    return {
      isLogedIn: false,
      data: null,
      isSuperAdmin: false,
      rawPermissions: [],
      permissions: {
        canReadRole: false,
        canCreateRole: false,
        canUpdateRole: false,
        canDeleteRole: false,

        canReadUser: false,
        canCreateUser: false,
        canUpdateUser: false,
        canDeleteUser: false,

        canReadTenant: false,
        canCreateTenant: false,
        canUpdateTenant: false,
        canDeleteTenant: false,

        canReadCampaign: false,
        canCreateCampaign: false,
        canUpdateCampaign: false,

        canCreateSuperAdmin: false,
        canUpdateSuperAdmin: false,
        canDeleteSuperAdmin: false,
      },
    };

  return {
    isLogedIn: true,
    data: user,
    isSuperAdmin: getIsUserSuperAdmin(user),
    rawPermissions: user.role.permissions,
    permissions: getUserPermissions(user),
  };
};
