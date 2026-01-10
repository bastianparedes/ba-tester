import { NextResponse } from 'next/server';
import { TypeApiResponse } from '@/types/api';
import { TypeGet } from './client';
import constants from '@/config/constants';

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
