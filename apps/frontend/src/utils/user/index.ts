import { apiCaller } from '@/libs/restClient';
import { getUserPermissions, type TypeFullUser } from './helper';

export const getUserFromCookies = async (): Promise<TypeFullUser> => {
  const userResponse = await apiCaller.users.get({});
  if (!userResponse.ok)
    return {
      isLogedIn: false,
      data: null,
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

        canReadExecutionGroup: false,
        canCreateExecutionGroup: false,
        canUpdateExecutionGroup: false,
      },
    };

  const user = await userResponse.json();

  return {
    isLogedIn: true,
    data: user,
    rawPermissions: user.role.permissions,
    permissions: getUserPermissions(user),
  };
};
