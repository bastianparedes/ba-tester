import { NextResponse } from 'next/server';
import constants from '@/config/constants';
import type { TypeApiResponse } from '@/types/api';
import type { TypeGet } from './client';

export async function GET(): TypeApiResponse<TypeGet['response']> {
  const res = NextResponse.json({});

  res.cookies.set(constants.cookieNames.token, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return res;
}
