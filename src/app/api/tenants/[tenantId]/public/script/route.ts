import fs from 'fs';
import path from 'path';
import { type TypeCampaignScript } from '@/types/db';
import { NextRequest } from 'next/server';
import { getCampaignsForScript } from '@/libs/db/functions';

export const GET = async (_req: NextRequest, { params: promiseParams }: { params: Promise<{ tenantId: string }> }) => {
  const params = await promiseParams;
  const fileExists = fs.existsSync(path.join(process.cwd(), 'dist', 'script.js'));
  if (!fileExists)
    return new Response('', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/javascript',
      },
    });

  const campaigns: TypeCampaignScript[] = await getCampaignsForScript({ tenantId: Number(params.tenantId) });
  if (campaigns.length === 0)
    return new Response('', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/javascript',
      },
    });

  const stringWindow = `window.ba_tester = window.ba_tester || {}\n;window.ba_tester.campaignsData = ${JSON.stringify(campaigns)};`;
  const script = fs.readFileSync(path.join(process.cwd(), 'dist', 'script.js'), 'utf-8');
  const fullScript = stringWindow + script;

  return new Response(fullScript, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/javascript',
    },
  });
};
