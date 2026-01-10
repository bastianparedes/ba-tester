import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateToken, secondsTokenIsValid } from '@/libs/auth/jwt';
import db from '@/libs/db/mongodb';
import bcrypt from 'bcrypt';
import { TypeApiResponse } from '@/types/api';
import { TypeGet, TypePost } from './client';
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

const logInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function POST(req: NextRequest): TypeApiResponse<TypePost['response']> {
  const body = await req.json();
  const parseResult = logInSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  }
  const { email, password }: TypePost['body'] = parseResult.data;

  const user = await db.users.getForLogin({ email });
  if (!user) {
    return NextResponse.json({ errors: ['Invalid credentials'] }, { status: 401 });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordIsCorrect) {
    return NextResponse.json({ errors: ['Invalid credentials'] }, { status: 401 });
  }

  const token = generateToken({ id: user.id, purpose: 'session' });

  const res = NextResponse.json({});
  res.cookies.set(constants.cookieNames.token, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: secondsTokenIsValid,
  });
  return res;
}
