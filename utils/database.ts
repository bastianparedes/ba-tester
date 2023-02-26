import { prisma } from '../lib/prisma';
import type {
  campaign,
  campaignJoined,
  evaluator,
  status,
  variation
} from '../types/databaseObjects';

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

const getCampaignsStatus = async (): Promise<
  Array<campaign & { status: status }>
> => {
  const campaigns = await prisma.campaign.findMany({
    include: { status: true },
    orderBy: [{ idCampaign: 'desc' }],
    where: {
      idStatus: {
        in: [0, 1]
      }
    }
  });

  return campaigns;
};

const getJoinedCampaignsActive = async (): Promise<campaignJoined[]> => {
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

const createCampaignJoined = async (campaign: campaignJoined): Promise<any> => {
  const result = await prisma.campaign.create({
    data: {
      evaluator: {
        create: campaign.evaluator.map((evaluator: evaluator) => {
          return {
            idEvaluator: evaluator.idEvaluator,
            javascript: evaluator.javascript,
            name: evaluator.name
          };
        })
      },
      idStatus: campaign.idStatus,
      name: campaign.name,
      variation: {
        create: campaign.variation.map((variation: variation) => {
          return {
            css: variation.css,
            html: variation.html,
            idVariation: variation.idVariation,
            javascript: variation.javascript,
            name: variation.name,
            traffic: variation.traffic
          };
        })
      }
    }
  });

  return result;
};

const updateCampaignJoined = async (
  campaign: campaignJoined
): Promise<campaign> => {
  const result = await prisma.campaign.update({
    data: {
      evaluator: {
        deleteMany: {
          idEvaluator: {
            notIn: campaign.evaluator.map(
              (evaluator: evaluator) => evaluator.idEvaluator
            )
          }
        },
        upsert: campaign.evaluator.map((evaluator: evaluator) => ({
          create: {
            idEvaluator: evaluator.idEvaluator,
            javascript: evaluator.javascript,
            name: evaluator.name
          },
          update: {
            javascript: evaluator.javascript,
            name: evaluator.name
          },
          where: {
            idEvaluator_idCampaign: {
              idCampaign: campaign.idCampaign,
              idEvaluator: evaluator.idEvaluator
            }
          }
        }))
      },
      idStatus: campaign.idStatus,
      name: campaign.name,
      variation: {
        deleteMany: {
          idVariation: {
            notIn: campaign.variation.map(
              (variation: variation) => variation.idVariation
            )
          }
        },
        upsert: campaign.variation.map((variation: variation) => ({
          create: {
            css: variation.css,
            html: variation.html,
            idVariation: variation.idVariation,
            javascript: variation.javascript,
            name: variation.name,
            traffic: variation.traffic
          },
          update: {
            css: variation.css,
            html: variation.html,
            javascript: variation.javascript,
            name: variation.name,
            traffic: variation.traffic
          },
          where: {
            idVariation_idCampaign: {
              idCampaign: campaign.idCampaign,
              idVariation: variation.idVariation
            }
          }
        }))
      }
    },
    where: {
      idCampaign: campaign.idCampaign
    }
  });

  return result;
};

const seed = async (): Promise<any> => {
  const result = await prisma.status.createMany({
    data: [
      { idStatus: 0, value: 'inactive' },
      { idStatus: 1, value: 'active' },
      { idStatus: 2, value: 'deleted' }
    ]
  });

  return result;
};

const getCampaignsForFrontend = async (): Promise<campaignJoined[]> => {
  const campaigns = await prisma.campaign.findMany({
    include: {
      evaluator: true,
      status: true,
      variation: {
        where: {
          traffic: {
            gt: 0
          }
        }
      }
    },
    where: {
      idStatus: {
        equals: 1
      },
      variation: {
        some: {
          idVariation: {
            not: 0
          }
        }
      }
    }
  });

  return campaigns;
};

export {
  createCampaignJoined,
  getCampaignById,
  getCampaigns,
  getCampaignsStatus,
  getJoinedCampaignsActive,
  getStatus,
  seed,
  updateCampaignJoined,
  getCampaignsForFrontend
};
