import fs from 'fs';
import path from 'path';
import { getCampaignsForFrontend } from '../../../../script/utils/database';
import { unstable_cache } from 'next/cache';

const cacheTime = process.env.NODE_ENV === 'production' ? 600 : 1;

const GET = async () => {
  console.log('ayuda antes');
  const getCachedScript = unstable_cache(
    async () => {
      console.log('ayuda dentro');
      const campaigns = await getCampaignsForFrontend();
      if (campaigns.length === 0) return '';
      const stringWindow = `window.ba_tester = window.ba_tester || {}\n;window.ba_tester.campaignsData = ${JSON.stringify(campaigns)};`;
      const fileExists = fs.existsSync(
        path.join(process.cwd(), 'dist', 'script.js')
      );

      if (!fileExists) {
        try {
        } catch {
          return '';
        }
      }
      const script = fs.readFileSync(
        path.join(process.cwd(), 'dist', 'script.js'),
        'utf-8'
      );

      return stringWindow + script;
    },
    ['script'],
    {
      revalidate: cacheTime
    }
  );

  console.log('ayuda después');
  return new Response(await getCachedScript());
};

export { GET };
