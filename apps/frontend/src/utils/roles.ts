import { superAdminRoleName } from '@/domain/config';
import type { TypeRole } from '@/domain/types';

export const isRoleSuperAdmin = (role: TypeRole) => {
  return role.name === superAdminRoleName;
};
