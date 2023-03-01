import { prisma } from '../lib/prisma';
import type {
  campaign,
  campaignWithStatus,
  campaignWithVariationsEvaluatorsStatus,
  evaluator,
  status,
  variation
} from '../types/databaseObjects';

const getCampaigns = async (): Promise<
  campaignWithVariationsEvaluatorsStatus[]
> => {
  const campaigns = await prisma.campaign.findMany({
    include: {
      evaluators: true,
      status: true,
      variations: true
    },
    where: {
      idStatus: {
        in: [0, 1]
      }
    }
  });

  return campaigns;
};

const getCampaignsStatus = async (): Promise<campaignWithStatus[]> => {
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

const getCampaignsActiveWithVariationsEvaluatorsStatus = async (): Promise<
  campaignWithVariationsEvaluatorsStatus[]
> => {
  const campaigns = await prisma.campaign.findMany({
    include: {
      evaluators: true,
      status: true,
      variations: true
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
): Promise<campaignWithVariationsEvaluatorsStatus | null> => {
  const campaign = await prisma.campaign.findUnique({
    include: {
      evaluators: true,
      status: true,
      variations: true
    },
    where: { idCampaign }
  });

  return campaign;
};

const getStatus = async (): Promise<status[]> => {
  const status = await prisma.status.findMany();
  return status;
};

const createCampaign = async (
  campaign: campaignWithVariationsEvaluatorsStatus
): Promise<any> => {
  const result = await prisma.campaign.create({
    data: {
      evaluators: {
        create: campaign.evaluators.map((evaluator: evaluator) => {
          return {
            idEvaluator: evaluator.idEvaluator,
            javascript: evaluator.javascript,
            name: evaluator.name
          };
        })
      },
      idStatus: campaign.idStatus,
      name: campaign.name,
      variations: {
        create: campaign.variations.map((variation: variation) => {
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

const updateCampaign = async (
  campaign: campaignWithVariationsEvaluatorsStatus
): Promise<campaign> => {
  const result = await prisma.campaign.update({
    data: {
      evaluators: {
        deleteMany: {
          idEvaluator: {
            notIn: campaign.evaluators.map(
              (evaluator: evaluator) => evaluator.idEvaluator
            )
          }
        },
        upsert: campaign.evaluators.map((evaluator: evaluator) => ({
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
      variations: {
        deleteMany: {
          idVariation: {
            notIn: campaign.variations.map(
              (variation: variation) => variation.idVariation
            )
          }
        },
        upsert: campaign.variations.map((variation: variation) => ({
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

const getCampaignsForFrontend = async (): Promise<
  campaignWithVariationsEvaluatorsStatus[]
> => {
  const campaigns = await prisma.campaign.findMany({
    include: {
      evaluators: true,
      status: true,
      variations: {
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
      variations: {
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
  createCampaign,
  getCampaignById,
  getCampaigns,
  getCampaignsStatus,
  getCampaignsActiveWithVariationsEvaluatorsStatus,
  getStatus,
  seed,
  updateCampaign,
  getCampaignsForFrontend
};
