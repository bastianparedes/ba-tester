import constants from '@/config/constants';
import type { TypeRole } from '@/types/domain';

export const isRoleSuperAdmin = (role: TypeRole) => {
  return role.name === constants.superAdminRoleName;
};
