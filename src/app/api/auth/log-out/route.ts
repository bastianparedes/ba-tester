import { NextResponse } from 'next/server';
import { tokenName } from '../../../../libs/auth/jsonwebtoken';
import { TypeApiResponse } from '../../../../types/api';
import { TypeGet } from './client';

export async function GET(): TypeApiResponse<TypeGet['response']> {
  const res = NextResponse.json({});

  res.cookies.set(tokenName, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return res;
}
