import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/libs/db/mongodb';
import { TypePut, TypeDelete } from './client';
import { TypeApiResponse } from '@/types/api';
import { flatPermissions } from '@/libs/permissions';
import constants from '@/config/constants';

const insertRoleSchema = z.object({
  name: z.string().refine((val) => val !== constants.superAdminRoleName, {
    message: `Name can't be "${constants.superAdminRoleName}"`,
  }),
  description: z.string(),
  permissions: z.array(z.enum(flatPermissions)),
});

export async function PUT(
  request: NextRequest,
  { params: promiseParams }: { params: Promise<{ roleId: string }> },
): TypeApiResponse<TypePut['response']> {
  const params = await promiseParams;
  const roleId = params.roleId;

  const body = await request.json();
  const parseResult = insertRoleSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
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

export async function DELETE(
  _request: NextRequest,
  { params: promiseParams }: { params: Promise<{ roleId: string }> },
): TypeApiResponse<TypeDelete['response']> {
  const params = await promiseParams;
  const roleId = params.roleId;

  await db.roles.remove({ roleId });
  return NextResponse.json({});
}
