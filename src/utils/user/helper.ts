import { permissions, superAdminOnlyPermissions } from '@/libs/permissions';
import { TypeUser } from '@/types/domain';
import constants from '@/config/constants';

export type TypeFullUser =
  | {
      isLogedIn: true;
      data: TypeUser;
      isSuperAdmin: boolean;
      rawPermissions: string[];
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

        canCreateSuperAdmin: boolean;
        canUpdateSuperAdmin: boolean;
        canDeleteSuperAdmin: boolean;
      };
    }
  | {
      isLogedIn: false;
      data: null;
      isSuperAdmin: false;
      rawPermissions: string[];
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

        canCreateSuperAdmin: false;
        canUpdateSuperAdmin: false;
        canDeleteSuperAdmin: false;
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

  canCreateSuperAdmin: !!user && user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.create),
  canUpdateSuperAdmin: !!user && user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.update),
  canDeleteSuperAdmin: !!user && user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.delete),
});

export const getIsUserSuperAdmin = (user: TypeUser | null) => !!user && user.role.name === constants.superAdminRoleName;
