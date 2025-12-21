import fs from 'fs';
import path from 'path';
import { getCampaignsForScript } from '@/libs/db/functions';
import { type TypeCampaignScript } from '@/types/db';

const GET = async () => {
  const fileExists = fs.existsSync(path.join(process.cwd(), 'dist', 'script.js'));
  if (!fileExists) return new Response('');

  const campaigns: TypeCampaignScript[] = await getCampaignsForScript();
  if (campaigns.length === 0) return new Response('');

  const stringWindow = `window.ba_tester = window.ba_tester || {}\n;window.ba_tester.campaignsData = ${JSON.stringify(campaigns)};`;
  const script = fs.readFileSync(path.join(process.cwd(), 'dist', 'script.js'), 'utf-8');
  const fullScript = stringWindow + script;

  return new Response(fullScript);
};

export { GET };
