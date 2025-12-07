import fs from 'fs';
import path from 'path';
import { getCampaignsForScript } from '@/script/utils/database';

const GET = async () => {
  const fileExists = fs.existsSync(path.join(process.cwd(), 'dist', 'script.js'));
  if (!fileExists) return '';

  const campaigns = await getCampaignsForScript();
  if (campaigns.length === 0) return '';

  const stringWindow = `window.ba_tester = window.ba_tester || {}\n;window.ba_tester.campaignsData = ${JSON.stringify(campaigns)};`;
  const script = fs.readFileSync(path.join(process.cwd(), 'dist', 'script.js'), 'utf-8');
  const fullScript = stringWindow + script;

  return new Response(fullScript);
};

export { GET };
