import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/libs/db/mongodb';
import { TypePost } from './client';
import { TypeApiResponse } from '@/types/api';
import constants from '@/config/constants';
import { getPasswordHashed } from '@/libs/auth/password';
import { getUserFromCookies } from '@/utils/user';
import { isRoleSuperAdmin } from '@/utils/roles';

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
  const passwordHash = getPasswordHashed(validated.password);

  const user = await getUserFromCookies();
  if (!user) return NextResponse.json({ errors: ['User is not logged in'] });
  const role = await db.roles.get({ id: validated.role.id });
  if (!role) return NextResponse.json({ errors: ['Role does not exist'] });

  if (isRoleSuperAdmin(role) && !user.permissions.canCreateSuperAdmin)
    return NextResponse.json({ errors: ['User does not have access'] });

  await db.users.create({ ...validated, passwordHash });
  return NextResponse.json({});
}
