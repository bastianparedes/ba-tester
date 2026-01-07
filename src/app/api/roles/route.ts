import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/libs/db/mongodb';
import { TypePost } from './client';
import { TypeApiResponse } from '@/types/api';
import { flatPermissions } from '@/libs/permissions';

const insertRoleSchema = z.object({
  name: z.string().refine((val) => val !== 'SuperAdmin', {
    message: "Name can't be 'SuperAdmin'",
  }),
  description: z.string(),
  permissions: z.array(z.enum(flatPermissions)),
});

export async function POST(request: NextRequest): TypeApiResponse<TypePost['response']> {
  const body = await request.json();
  const parseResult = insertRoleSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePost['body'] = parseResult.data;
  await db.roles.create(validated);
  return NextResponse.json({});
}
