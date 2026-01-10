import { TypeUser } from '@/types/domain';
import constants from '@/config/constants';
import { cookies } from 'next/headers';



const cookieStore = await cookies();
const languageInCookie = cookieStore.get('lang')?.value || 'english';

export const isUserSuperAdmin = (user: TypeUser) => {
  return user.role.name === constants.superAdminRoleName;
};

export const getUser

