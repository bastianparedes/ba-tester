import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { superAdminRoleName } from '@/domain/config';
import { flatPermissions } from '@/domain/permissions';
import type { TypeApiResponse } from '@/domain/types/api';
import db from '@/libs/db';
import type { TypePost } from './client';

const insertRoleSchema = z.object({
  name: z.string().refine((val) => val !== superAdminRoleName, {
    message: `Name can't be "${superAdminRoleName}"`,
  }),
  description: z.string(),
  permissions: z.array(z.enum(flatPermissions)),
});

export async function POST(request: NextRequest): TypeApiResponse<TypePost['response']> {
  const body = await request.json();
  const parseResult = insertRoleSchema.safeParse(body);
  if (!parseResult.success) return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePost['body'] = parseResult.data;
  const user = await db.roles.create(validated);
  return NextResponse.json({
    data: user,
  });
}
