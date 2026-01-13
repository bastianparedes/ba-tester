import fs from 'node:fs';
import path from 'node:path';
import type { NextRequest } from 'next/server';
import db from '@/libs/db';
import type { TypeCampaignScript } from '@/types/domain';

export const GET = async (
  _req: NextRequest,
  { params: promiseParams }: { params: Promise<{ tenantId: string }> },
) => {
  const params = await promiseParams;

  const cacheKey = `tenant_${params.tenantId}_public_script`;
  const cachedScript = await db.cache.get(cacheKey);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/javascript',
  };

  if (cachedScript) {
    return new Response(cachedScript, { headers });
  }

  const fileExists = fs.existsSync(
    path.join(process.cwd(), 'dist', 'script.js'),
  );
  if (!fileExists) return new Response('', { headers });

  const campaigns: TypeCampaignScript[] = await db.campaigns.getAllForScript({
    tenantId: Number(params.tenantId),
  });
  if (campaigns.length === 0) return new Response('', { headers });

  const stringWindow = `window.ba_tester = window.ba_tester || {}\n;window.ba_tester.campaignsData = ${JSON.stringify(campaigns)};`;
  const script = fs.readFileSync(
    path.join(process.cwd(), 'dist', 'script.js'),
    'utf-8',
  );
  const fullScript = stringWindow + script;

  await db.cache.save({ key: cacheKey, value: fullScript, ttlMinutes: 1 });
  return new Response(fullScript, { headers });
};
