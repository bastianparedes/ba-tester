import type { NextRequest } from 'next/server';
import { getBuiltScript } from './util';

export const GET = async (
  _req: NextRequest,
  { params: promiseParams }: { params: Promise<{ tenantId: string }> },
) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/javascript',
  };
  const params = await promiseParams;
  const script = await getBuiltScript({ tenantId: params.tenantId });
  return new Response(script, { headers });
};
