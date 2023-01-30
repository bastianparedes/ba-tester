import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../lib/prisma';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const campaigns = await prisma.campaign.findMany({
      include: {
        evaluator: true,
        status: true,
        variation: true
      },
      where: {
        idStatus: {
          equals: 1
        }
      }
    });

    res.json(campaigns);
  }
};

export default getCampaigns;
