import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import constants from '@/config/constants';
import db from '@/libs/db';
import { flatPermissions } from '@/libs/permissions';
import type { TypeApiResponse } from '@/types/api';
import type { TypePost } from './client';

const insertRoleSchema = z.object({
  name: z.string().refine((val) => val !== constants.superAdminRoleName, {
    message: `Name can't be "${constants.superAdminRoleName}"`,
  }),
  description: z.string(),
  permissions: z.array(z.enum(flatPermissions)),
});

export async function POST(
  request: NextRequest,
): TypeApiResponse<TypePost['response']> {
  const body = await request.json();
  const parseResult = insertRoleSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json(
      { errors: parseResult.error.issues.map((error) => error.message) },
      { status: 400 },
    );
  const validated: TypePost['body'] = parseResult.data;
  const user = await db.roles.create(validated);
  return NextResponse.json({
    data: user,
  });
}
