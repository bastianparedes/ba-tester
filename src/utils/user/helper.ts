import { permissions, superAdminOnlyPermissions } from '@/libs/permissions';
import { TypeUser } from '@/types/domain';
import constants from '@/config/constants';

export type TypeFullUser =
  | {
      isLogedIn: true;
      data: TypeUser;
      isSuperAdmin: boolean;
      permissions: {
        canReadRole: boolean;
        canCreateRole: boolean;
        canUpdateRole: boolean;
        canDeleteRole: boolean;

        canReadUser: boolean;
        canCreateUser: boolean;
        canUpdateUser: boolean;
        canDeleteUser: boolean;

        canReadTenant: boolean;
        canCreateTenant: boolean;
        canUpdateTenant: boolean;
        canDeleteTenant: boolean;

        canReadCampaign: boolean;
        canCreateCampaign: boolean;
        canUpdateCampaign: boolean;

        canCreateSuperUser: boolean;
        canUpdateSuperUser: boolean;
        canDeleteSuperUser: boolean;
      };
    }
  | {
      isLogedIn: false;
      data: null;
      isSuperAdmin: false;
      permissions: {
        canReadRole: false;
        canCreateRole: false;
        canUpdateRole: false;
        canDeleteRole: false;

        canReadUser: false;
        canCreateUser: false;
        canUpdateUser: false;
        canDeleteUser: false;

        canReadTenant: false;
        canCreateTenant: false;
        canUpdateTenant: false;
        canDeleteTenant: false;

        canReadCampaign: false;
        canCreateCampaign: false;
        canUpdateCampaign: false;

        canCreateSuperUser: false;
        canUpdateSuperUser: false;
        canDeleteSuperUser: false;
      };
    };
export const getUserPermissions = (user: TypeUser | null) => ({
  canReadRole: !!user && user.role.permissions.includes(permissions.role.read),
  canCreateRole: !!user && user.role.permissions.includes(permissions.role.create),
  canUpdateRole: !!user && user.role.permissions.includes(permissions.role.update),
  canDeleteRole: !!user && user.role.permissions.includes(permissions.role.delete),

  canReadUser: !!user && user.role.permissions.includes(permissions.user.read),
  canCreateUser: !!user && user.role.permissions.includes(permissions.user.create),
  canUpdateUser: !!user && user.role.permissions.includes(permissions.user.update),
  canDeleteUser: !!user && user.role.permissions.includes(permissions.user.delete),

  canReadTenant: !!user && user.role.permissions.includes(permissions.tenant.read),
  canCreateTenant: !!user && user.role.permissions.includes(permissions.tenant.create),
  canUpdateTenant: !!user && user.role.permissions.includes(permissions.tenant.update),
  canDeleteTenant: !!user && user.role.permissions.includes(permissions.tenant.delete),

  canReadCampaign: !!user && user.role.permissions.includes(permissions.campaign.read),
  canCreateCampaign: !!user && user.role.permissions.includes(permissions.campaign.create),
  canUpdateCampaign: !!user && user.role.permissions.includes(permissions.campaign.update),

  canCreateSuperUser: !!user && user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.create),
  canUpdateSuperUser: !!user && user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.update),
  canDeleteSuperUser: !!user && user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.delete),
});

export const getIsUserSuperAdmin = (user: TypeUser | null) => !!user && user.role.name === constants.superAdminRoleName;
