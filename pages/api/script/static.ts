import fsPromises from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const scripts = await Promise.all(
      ['campaigns.js', 'script.js'].map(async (fileName): Promise<string> => {
        return await fsPromises.readFile(
          path.join(process.cwd(), 'dist', fileName),
          'utf-8'
        );
      })
    );
    const script = scripts.reduce(
      (accumulatedScript, nextScript) => accumulatedScript + nextScript
    );

    res.send(script);
  }
};

export default getCampaigns;
