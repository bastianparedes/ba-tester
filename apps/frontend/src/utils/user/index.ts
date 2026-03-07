import { apiCaller } from '@/libs/restClient';
import { getUserPermissions, type TypeFullUser } from './helper';

export const getUserFromCookies = async (): Promise<TypeFullUser> => {
  const userResponse = await apiCaller.users.get({});
  if (!userResponse.ok)
    return {
      data: null,
      isLogedIn: false,
      permissions: {
        canCreateCampaign: false,
        canCreateExecutionGroup: false,
        canCreateRole: false,
        canCreateTenant: false,
        canCreateUser: false,
        canDeleteCampaign: false,
        canDeleteExecutionGroup: false,
        canDeleteRole: false,
        canDeleteTenant: false,
        canDeleteUser: false,

        canReadCampaign: false,

        canReadExecutionGroup: false,
        canReadRole: false,

        canReadTenant: false,

        canReadUser: false,
        canUpdateCampaign: false,
        canUpdateExecutionGroup: false,
        canUpdateRole: false,
        canUpdateTenant: false,
        canUpdateUser: false,
      },
      rawPermissions: [],
    };

  const user = await userResponse.json();

  return {
    data: user,
    isLogedIn: true,
    permissions: getUserPermissions(user),
    rawPermissions: user.role.permissions,
  };
};
