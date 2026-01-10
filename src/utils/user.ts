import { TypeUser } from '@/types/domain';
import constants from '@/config/constants';

export const isSuperAdmin = (user: TypeUser) => {
  return user.role.name === constants.superAdminRoleName;
};
