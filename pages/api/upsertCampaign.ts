import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../lib/prisma';
import type {
  campaignJoined,
  evaluator,
  variation
} from '../../types/databaseObjects';

const getCampaigns = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const campaign: campaignJoined = req.body.campaign;

    if (campaign.idCampaign === 0) {
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
      res.send(result);
      return;
    }

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

    res.send(result);
  }
};

export default getCampaigns;
