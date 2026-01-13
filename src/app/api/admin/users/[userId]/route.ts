import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import constants from '@/config/constants';
import db from '@/libs/db';
import type { TypeApiResponse } from '@/types/api';
import { getUserFromCookies } from '@/utils/user';
import { getIsUserSuperAdmin } from '@/utils/user/helper';
import type { TypeDelete, TypePut } from './client';

const updateUserSchema = z.object({
  name: z.string().refine((val) => val !== constants.superAdminRoleName, {
    message: `Name can't be "${constants.superAdminRoleName}"`,
  }),
  email: z.string(),
  role: z.object({
    id: z.string(),
  }),
});

export async function PUT(
  request: NextRequest,
  { params: promiseParams }: { params: Promise<{ userId: string }> },
): TypeApiResponse<TypePut['response']> {
  const params = await promiseParams;
  const userId = params.userId;

  const body = await request.json();
  const parseResult = updateUserSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json(
      { errors: parseResult.error.issues.map((error) => error.message) },
      { status: 400 },
    );
  const validated: TypePut['body'] = parseResult.data;
  await db.users.update(
    { userId },
    {
      name: validated.name,
      email: validated.email,
      role: validated.role,
    },
  );
  return NextResponse.json({});
}

export async function DELETE(
  _request: NextRequest,
  { params: promiseParams }: { params: Promise<{ userId: string }> },
): TypeApiResponse<TypeDelete['response']> {
  const params = await promiseParams;
  const userId = params.userId;

  const currentUser = await getUserFromCookies();
  if (!currentUser)
    return NextResponse.json({ errors: ['User is not logged in'] });

  const user = await db.users.get({ userId });
  if (!user) return NextResponse.json({ errors: ['User does noe exist'] });

  if (getIsUserSuperAdmin(user)) {
    if (!currentUser.permissions.canDeleteSuperAdmin)
      return NextResponse.json({ errors: ['User does not have access'] });

    const roleSuperAdmin = await db.roles.get({
      name: constants.superAdminRoleName,
    });
    if (!roleSuperAdmin)
      return NextResponse.json({ errors: ['No super admin role in db'] });

    const superAdmins = await db.users.getMany({ role: roleSuperAdmin.id });
    const thereAreMoreThan2SuperAdmins = superAdmins.length > 2;

    if (!thereAreMoreThan2SuperAdmins)
      return NextResponse.json({
        errors: ['Quantity of super admins can not go lower than 2'],
      });
  }

  await db.users.remove({ userId });
  return NextResponse.json({});
}
