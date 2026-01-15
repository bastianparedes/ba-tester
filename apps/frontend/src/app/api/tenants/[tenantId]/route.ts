import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { TypeApiResponse } from '@/domain/types/api';
import db from '@/libs/db';
import type { TypePut } from './client';

const updateTenantSchema = z.object({
  name: z.string(),
  description: z.string(),
  domain: z.string(),
});

export async function PUT(request: NextRequest, { params: promiseParams }: { params: Promise<{ tenantId: string }> }): TypeApiResponse<TypePut['response']> {
  const params = await promiseParams;
  const tenantId = parseInt(params.tenantId, 10);
  const body = await request.json();
  const parseResult = updateTenantSchema.safeParse(body);
  if (!parseResult.success) return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePut['body'] = parseResult.data;

  const result = await db.tenants.update(tenantId, validated);

  return NextResponse.json({
    data: result,
  });
}
