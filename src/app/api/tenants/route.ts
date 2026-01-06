import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/libs/db/postgres';
import { TypeGet, TypePost } from './client';
import { TypeApiResponse } from '@/types/api';

export async function GET(): TypeApiResponse<TypeGet['response']> {
  const tenants = await db.tenants.getAll();
  return NextResponse.json({ data: { tenants } });
}

const insertTenantSchema = z.object({
  description: z.string(),
  name: z.string(),
  domain: z.string(),
});

export async function POST(request: NextRequest): TypeApiResponse<TypePost['response']> {
  const body = await request.json();
  const parseResult = insertTenantSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePost['body'] = parseResult.data;
  const newTenant = await db.tenants.create(validated);
  return NextResponse.json({
    data: newTenant,
  });
}
