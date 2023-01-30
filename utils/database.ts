import { prisma } from '../lib/prisma';
import type { campaignJoined, status } from '../types/databaseObjects';

const getCampaigns = async (): Promise<campaignJoined[]> => {
  const campaigns = await prisma.campaign.findMany({
    include: {
      evaluator: true,
      status: true,
      variation: true
    },
    where: {
      idStatus: {
        in: [0, 1]
      }
    }
  });

  return campaigns;
};

const getCampaignById = async (
  idCampaign: number
): Promise<campaignJoined | null> => {
  const campaign = await prisma.campaign.findUnique({
    include: {
      evaluator: true,
      status: true,
      variation: true
    },
    where: { idCampaign }
  });

  return campaign;
};

const getStatus = async (): Promise<status[]> => {
  const status = await prisma.status.findMany();
  return status;
};

export default { getCampaignById, getCampaigns, getStatus };
