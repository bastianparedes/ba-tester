import { TypeRole } from '@/types/domain';
import constants from '@/config/constants';

export const isRoleSuperAdmin = (role: TypeRole) => {
  return role.name === constants.superAdminRoleName;
};
