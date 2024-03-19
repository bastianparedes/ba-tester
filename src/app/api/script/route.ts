import fs from 'fs';
import path from 'path';
import { getCampaignsForFrontend } from '../../../../script/utils/database';

const GET = async () => {
  const campaigns = await getCampaignsForFrontend();

  const stringWindow = `window.ba_tester = window.ba_tester || {}\n;window.ba_tester.campaignsData = ${JSON.stringify(campaigns)};`;

  const fileExists = fs.existsSync(
    path.join(process.cwd(), 'dist', 'script.js')
  );

  if (!fileExists) {
    try {
    } catch {
      return new Response();
    }
  }

  const script = fs.readFileSync(
    path.join(process.cwd(), 'dist', 'script.js'),
    'utf-8'
  );

  return new Response(stringWindow + script);
};

export { GET };
