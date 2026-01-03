import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/libs/db';
import { TypePut } from './client';
import { TypeApiResponse } from '@/types/api';

const updateTenantSchema = z.object({
  name: z.string(),
  description: z.string(),
  domain: z.string(),
});

export async function PUT(
  request: NextRequest,
  { params: promiseParams }: { params: Promise<{ tenantId: string }> },
): TypeApiResponse<TypePut['response']> {
  const params = await promiseParams;
  const tenantId = parseInt(params.tenantId);
  const body = await request.json();
  const parseResult = updateTenantSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePut['body'] = parseResult.data;

  const result = await db.updateTenant(tenantId, validated);

  return NextResponse.json({
    data: result,
  });
}
