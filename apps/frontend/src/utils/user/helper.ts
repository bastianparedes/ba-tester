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

        canReadTrackEvent: boolean;
        canCreateTrackEvent: boolean;
        canUpdateTrackEvent: boolean;
        canDeleteTrackEvent: boolean;

        canReadAudience: boolean;
        canCreateAudience: boolean;
        canUpdateAudience: boolean;
        canDeleteAudience: boolean;
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

        canReadTrackEvent: false;
        canCreateTrackEvent: false;
        canUpdateTrackEvent: false;
        canDeleteTrackEvent: false;

        canReadAudience: false;
        canCreateAudience: false;
        canUpdateAudience: false;
        canDeleteAudience: false;
      };
    };
export const getUserPermissions = (user: TypeUser) => {
  const userPermissions =
    user.roles.reduce((acc, role) => {
      role.permissions.forEach((permission) => {
        if (!acc.includes(permission)) acc.push(permission);
      });
      return acc;
    }, [] as string[]) ?? [];
  return {
    permissions: {
      canCreateAudience: userPermissions.includes(permissions.audience.create),
      canCreateCampaign: userPermissions.includes(permissions.campaign.create),
      canCreateExecutionGroup: userPermissions.includes(permissions.executionGroup.create),
      canCreateRole: userPermissions.includes(permissions.role.create),
      canCreateTenant: userPermissions.includes(permissions.tenant.create),
      canCreateTrackEvent: userPermissions.includes(permissions.trackEvent.update),
      canCreateUser: userPermissions.includes(permissions.user.create),
      canDeleteAudience: userPermissions.includes(permissions.audience.delete),
      canDeleteCampaign: userPermissions.includes(permissions.campaign.delete),
      canDeleteExecutionGroup: userPermissions.includes(permissions.executionGroup.delete),
      canDeleteRole: userPermissions.includes(permissions.role.delete),
      canDeleteTenant: userPermissions.includes(permissions.tenant.delete),
      canDeleteTrackEvent: userPermissions.includes(permissions.trackEvent.update),
      canDeleteUser: userPermissions.includes(permissions.user.delete),
      canReadAudience: userPermissions.includes(permissions.audience.read),
      canReadCampaign: userPermissions.includes(permissions.campaign.read),
      canReadExecutionGroup: userPermissions.includes(permissions.executionGroup.read),
      canReadRole: userPermissions.includes(permissions.role.read),
      canReadTenant: userPermissions.includes(permissions.tenant.read),
      canReadTrackEvent: userPermissions.includes(permissions.trackEvent.update),
      canReadUser: userPermissions.includes(permissions.user.read),
      canUpdateAudience: userPermissions.includes(permissions.audience.update),
      canUpdateCampaign: userPermissions.includes(permissions.campaign.update),
      canUpdateExecutionGroup: userPermissions.includes(permissions.executionGroup.update),
      canUpdateRole: userPermissions.includes(permissions.role.update),
      canUpdateTenant: userPermissions.includes(permissions.tenant.update),
      canUpdateTrackEvent: userPermissions.includes(permissions.trackEvent.update),
      canUpdateUser: userPermissions.includes(permissions.user.update),
    },
    rawPermissions: userPermissions,
  };
};
