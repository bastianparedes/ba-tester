import { eq } from 'drizzle-orm';
import db from '@/libs/db/index';

const getCampaignsForFrontend = async () => {
  return (
    await db.query.Campaign.findMany({
      columns: {
        id: true,
        name: true,
        requirements: true,
        triggers: true,
        variations: true,
      },
      where: (campaign) => eq(campaign.status, 'active'),
    })
  ).filter((campaign) => campaign.variations.length > 0 && campaign.triggers.length > 0);
};

export { getCampaignsForFrontend };
