import { apiCaller } from '@/libs/restClient';
import { getUserPermissions, type TypeFullUser } from './helper';

export const getUserFromCookies = async (): Promise<TypeFullUser> => {
  const userResponse = await apiCaller.users.get();
  if (!userResponse.ok)
    return {
      data: null,
      isLogedIn: false,
      permissions: {
        canCreateAudience: false,
        canCreateCampaign: false,
        canCreateExecutionGroup: false,
        canCreateRole: false,
        canCreateTenant: false,
        canCreateTrackEvent: false,
        canCreateUser: false,
        canDeleteAudience: false,
        canDeleteCampaign: false,
        canDeleteExecutionGroup: false,
        canDeleteRole: false,
        canDeleteTenant: false,
        canDeleteTrackEvent: false,
        canDeleteUser: false,
        canReadAudience: false,
        canReadCampaign: false,
        canReadExecutionGroup: false,
        canReadRole: false,
        canReadTenant: false,
        canReadTrackEvent: false,
        canReadUser: false,
        canUpdateAudience: false,
        canUpdateCampaign: false,
        canUpdateExecutionGroup: false,
        canUpdateRole: false,
        canUpdateTenant: false,
        canUpdateTrackEvent: false,
        canUpdateUser: false,
      },
      rawPermissions: [],
    };

  const user = await userResponse.json();

  const permissions = getUserPermissions(user);
  return {
    data: user,
    isLogedIn: true,
    permissions: permissions.permissions,
    rawPermissions: permissions.rawPermissions,
  };
};
