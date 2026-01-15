import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { superAdminRoleName } from '@/domain/config';
import { flatPermissions } from '@/domain/permissions';
import type { TypeApiResponse } from '@/domain/types/api';
import db from '@/libs/db';
import { isRoleSuperAdmin } from '@/utils/roles';
import type { TypeDelete, TypePut } from './client';

const insertRoleSchema = z.object({
  name: z.string().refine((val) => val !== superAdminRoleName, {
    message: `Name can't be "${superAdminRoleName}"`,
  }),
  description: z.string(),
  permissions: z.array(z.enum(flatPermissions)),
});

export async function PUT(request: NextRequest, { params: promiseParams }: { params: Promise<{ roleId: string }> }): TypeApiResponse<TypePut['response']> {
  const params = await promiseParams;
  const roleId = params.roleId;

  const body = await request.json();
  const parseResult = insertRoleSchema.safeParse(body);
  if (!parseResult.success) return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePut['body'] = parseResult.data;
  await db.roles.update(
    { roleId },
    {
      name: validated.name,
      description: validated.description,
      permissions: validated.permissions,
    },
  );
  return NextResponse.json({});
}

export async function DELETE(_request: NextRequest, { params: promiseParams }: { params: Promise<{ roleId: string }> }): TypeApiResponse<TypeDelete['response']> {
  const params = await promiseParams;
  const roleId = params.roleId;

  const role = await db.roles.get({ id: roleId });
  if (!role) return NextResponse.json({ errors: ['Role does not exist'] });
  if (isRoleSuperAdmin(role))
    return NextResponse.json({
      errors: ['Role Super Admin can not be deleted'],
    });

  await db.roles.remove({ roleId });
  return NextResponse.json({});
}
