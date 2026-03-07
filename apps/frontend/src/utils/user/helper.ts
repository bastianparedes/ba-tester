import { permissions } from '@/domain/permissions';
import type { TypeUser } from '@/domain/types/user';

export type TypeFullUser =
  | {
      isLogedIn: true;
      data: TypeUser;
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
        canDeleteCampaign: boolean;

        canReadExecutionGroup: boolean;
        canCreateExecutionGroup: boolean;
        canUpdateExecutionGroup: boolean;
        canDeleteExecutionGroup: boolean;
      };
    }
  | {
      isLogedIn: false;
      data: null;
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
        canDeleteCampaign: false;

        canReadExecutionGroup: false;
        canCreateExecutionGroup: false;
        canUpdateExecutionGroup: false;
        canDeleteExecutionGroup: false;
      };
    };
export const getUserPermissions = (user: TypeUser | null) => ({
  canCreateCampaign: !!user && user.role.permissions.includes(permissions.campaign.create),
  canCreateExecutionGroup: !!user && user.role.permissions.includes(permissions.executionGroup.create),
  canCreateRole: !!user && user.role.permissions.includes(permissions.role.create),
  canCreateTenant: !!user && user.role.permissions.includes(permissions.tenant.create),
  canCreateUser: !!user && user.role.permissions.includes(permissions.user.create),
  canDeleteCampaign: !!user && user.role.permissions.includes(permissions.campaign.delete),
  canDeleteExecutionGroup: !!user && user.role.permissions.includes(permissions.executionGroup.delete),
  canDeleteRole: !!user && user.role.permissions.includes(permissions.role.delete),
  canDeleteTenant: !!user && user.role.permissions.includes(permissions.tenant.delete),
  canDeleteUser: !!user && user.role.permissions.includes(permissions.user.delete),

  canReadCampaign: !!user && user.role.permissions.includes(permissions.campaign.read),

  canReadExecutionGroup: !!user && user.role.permissions.includes(permissions.executionGroup.read),
  canReadRole: !!user && user.role.permissions.includes(permissions.role.read),

  canReadTenant: !!user && user.role.permissions.includes(permissions.tenant.read),

  canReadUser: !!user && user.role.permissions.includes(permissions.user.read),
  canUpdateCampaign: !!user && user.role.permissions.includes(permissions.campaign.update),
  canUpdateExecutionGroup: !!user && user.role.permissions.includes(permissions.executionGroup.update),
  canUpdateRole: !!user && user.role.permissions.includes(permissions.role.update),
  canUpdateTenant: !!user && user.role.permissions.includes(permissions.tenant.update),
  canUpdateUser: !!user && user.role.permissions.includes(permissions.user.update),
});
