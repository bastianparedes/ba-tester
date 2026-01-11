import { TypeUser } from '@/types/domain';
import { getUserPermissions, getIsUserSuperAdmin, type TypeFullUser } from './helper';

export const getUserData = (user: TypeUser | null): TypeFullUser => {
  if (!user)
    return {
      isLogedIn: false,
      data: null,
      isSuperAdmin: false,
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
      },
    };

  return {
    isLogedIn: true,
    data: user,
    isSuperAdmin: getIsUserSuperAdmin(user),
    permissions: getUserPermissions(user),
  };
};
