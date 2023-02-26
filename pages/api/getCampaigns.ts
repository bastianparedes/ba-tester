import type { NextApiRequest, NextApiResponse } from 'next';

import { getJoinedCampaignsActive } from '../../utils/database';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const campaigns = await getJoinedCampaignsActive();
    res.json(campaigns);
  }
};

export default getCampaigns;
