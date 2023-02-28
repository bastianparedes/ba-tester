import fsPromises from 'fs/promises';
import path from 'path';

import { getCampaignsForFrontend } from '../utils/database';

const runScript = async (): Promise<void> => {
  const campaigns = await getCampaignsForFrontend();
  await fsPromises.writeFile(
    path.join(process.cwd(), 'dist', 'campaigns.js'),
    'window.ab = window.ab || {};window.ab.campaigns = ' +
      JSON.stringify(campaigns) +
      ';',
    'utf-8'
  );
};

runScript();
