import { cookies, headers } from 'next/headers';
import { cookieNames } from '@/domain/config';
import { getTokenData } from '@/libs/auth/jwt';
import { apiCaller } from '@/libs/restClient';
import { getIsUserSuperAdmin, getUserPermissions, type TypeFullUser } from './helper';

export const getUserFromCookies = async (): Promise<TypeFullUser> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieNames.token)?.value;
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

  const headersList = await headers();
  const cookiesFromHeaders = headersList.get('cookie') as string;
  const userResponse = await apiCaller.users.get({ headers: { Cookie: cookiesFromHeaders }, pathParams: { userId: tokenData.id } });
  if (!userResponse.ok)
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

  const user = await userResponse.json();

  return {
    isLogedIn: true,
    data: user,
    isSuperAdmin: getIsUserSuperAdmin(user),
    rawPermissions: user.role.permissions,
    permissions: getUserPermissions(user),
  };
};
