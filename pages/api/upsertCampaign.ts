import type { NextApiRequest, NextApiResponse } from 'next';

import type { campaignWithVariationsEvaluatorsStatus } from '../../types/databaseObjects';
import { createCampaign, updateCampaign } from '../../utils/database';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const campaign: campaignWithVariationsEvaluatorsStatus = req.body.campaign;

    if (campaign.idCampaign === 0) {
      const result = await createCampaign(campaign);
      res.send(result);
      return;
    }

    const result = await updateCampaign(campaign);

    res.send(result);
  }
};

export default getCampaigns;
