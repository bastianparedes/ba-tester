import { prisma } from '../lib/prisma';
import type { campaignJoined } from '../types/databaseObjects';

const queryDatabase = async (): Promise<{ campaigns: campaignJoined[] }> => {
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

  return { campaigns };
};

export default queryDatabase;
