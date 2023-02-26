import type { NextApiRequest, NextApiResponse } from 'next';

import type { campaignWithVariationsEvaluatorsStatus } from '../../types/databaseObjects';
import { createCampaign, updateCampaign } from '../../utils/database';
import { deploy } from '../../utils/repository';

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

    const resultUpdateCampaign = await updateCampaign(campaign);
    const resultDeploy = await deploy();

    res.send({
      resultDeploy,
      resultUpdateCampaign
    });
  }
};

export default getCampaigns;
