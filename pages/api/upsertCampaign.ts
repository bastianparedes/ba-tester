import type { NextApiRequest, NextApiResponse } from 'next';

import type { campaignJoined } from '../../types/databaseObjects';
import {
  createCampaignJoined,
  updateCampaignJoined
} from '../../utils/database';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const campaign: campaignJoined = req.body.campaign;

    if (campaign.idCampaign === 0) {
      const result = await createCampaignJoined(campaign);
      res.send(result);
      return;
    }

    const result = await updateCampaignJoined(campaign);

    res.send(result);
  }
};

export default getCampaigns;
