import fsPromises from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { getCampaignsForFrontend } from '../../../utils/database';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const jsonData = await getCampaignsForFrontend();

    const script =
      `window.AB = window.AB || {};window.AB.campaigns = ${JSON.stringify(
        jsonData
      )};` +
      (await fsPromises.readFile(
        path.join(process.cwd(), 'dist', 'script.js'),
        'utf-8'
      ));

    res.send(script);
  }
};

export default getCampaigns;
