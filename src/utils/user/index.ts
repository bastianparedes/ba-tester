import constants from '@/config/constants';
import { cookies } from 'next/headers';
import db from '@/libs/db/mongodb';
import { getTokenData } from '@/libs/auth/jwt';

export const getUserFromCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(constants.cookieNames.token)?.value;
  if (!token) return null;

  const tokenData = getTokenData({ token, purpose: 'session' });
  if (!tokenData.valid) return null;

  const user = db.users.get({ userId: tokenData.id });
  if (!user) return null;

  return user;
};
