import type { NextApiRequest, NextApiResponse } from 'next';

import { getCampaignsActiveWithVariationsEvaluatorsStatus } from '../../utils/database';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const campaigns = await getCampaignsActiveWithVariationsEvaluatorsStatus();
    res.json(campaigns);
  }
};

export default getCampaigns;
