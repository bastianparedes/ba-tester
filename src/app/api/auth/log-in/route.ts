import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { tokenName, generateToken, secondsTokenIsValid } from '@/libs/auth/jwt';
import db from '@/libs/db/mongodb';
import { isPasswordCorrect } from '@/libs/auth/password';
import { TypeApiResponse } from '@/types/api';
import { TypePost } from './client';

const SignInSchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string(),
});

export async function POST(req: NextRequest): TypeApiResponse<TypePost['response']> {
  /* if (env.NODE_ENV === 'development') return NextResponse.json({}); */
  try {
    const body = await req.json();
    const parseResult = SignInSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
    }
    const { email, password }: TypePost['body'] = parseResult.data;

    const user = await db.users.getForLogin({ email });
    if (!user) {
      return NextResponse.json({ errors: ['Invalid credentials'] }, { status: 401 });
    }

    const passwordIsCorrect = await isPasswordCorrect({ password, passwordHash: user.passwordHash });
    if (!passwordIsCorrect) {
      return NextResponse.json({ errors: ['Invalid credentials'] }, { status: 401 });
    }

    const token = generateToken({ id: user.id, purpose: 'session' });

    const res = NextResponse.json({});
    res.cookies.set(tokenName, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: secondsTokenIsValid,
    });
    return res;
  } catch (error) {
    console.error('Error en POST /signin:', error);
    return NextResponse.json({ errors: ['Error in server side'] }, { status: 500 });
  }
}
