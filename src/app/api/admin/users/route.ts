import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/libs/db/mongodb';
import { TypePost } from './client';
import { TypeApiResponse } from '@/types/api';
import constants from '@/config/constants';
import { getPasswordHashed } from '@/libs/auth/password';

const insertUserSchema = z.object({
  name: z.string().refine((val) => val !== constants.superAdminRoleName, {
    message: `Name can't be "${constants.superAdminRoleName}"`,
  }),
  email: z.string(),
  password: z.string(),
  role: z.object({
    id: z.string(),
  }),
});

export async function POST(request: NextRequest): TypeApiResponse<TypePost['response']> {
  const body = await request.json();
  const parseResult = insertUserSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePost['body'] = parseResult.data;
  const passwordHash = await getPasswordHashed(validated.password);
  await db.users.create({ ...validated, passwordHash });
  return NextResponse.json({});
}
