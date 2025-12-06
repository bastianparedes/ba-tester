import fs from 'fs';
import path from 'path';
import { getCampaignsForScript } from '@/script/utils/database';
import { unstable_cache } from 'next/cache';
import env from '@/libs/env';

const cacheTime = env.NODE_ENV === 'production' ? 600 : 1;

const GET = async () => {
  const getCachedScript = unstable_cache(
    async () => {
      const campaigns = await getCampaignsForScript();
      if (campaigns.length === 0) return '';
      const stringWindow = `window.ba_tester = window.ba_tester || {}\n;window.ba_tester.campaignsData = ${JSON.stringify(campaigns)};`;
      const fileExists = fs.existsSync(path.join(process.cwd(), 'dist', 'script.js'));

      if (!fileExists) {
        try {
          /* empty */
        } catch {
          return '';
        }
      }
      const script = fs.readFileSync(path.join(process.cwd(), 'dist', 'script.js'), 'utf-8');

      return stringWindow + script;
    },
    ['script'],
    {
      revalidate: cacheTime,
    },
  );
  return new Response(await getCachedScript());
};

export { GET };
