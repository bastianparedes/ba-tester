import { eq } from 'drizzle-orm';
import db from '../../lib/drizzle/index';

const getCampaignsForFrontend = async () => {
  return (
    await db.query.Campaign.findMany({
      columns: {
        lastModifiedDate: false
      },
      where: (campaign) => eq(campaign.status, 'active')
    })
  ).filter(
    (campaign) => campaign.variations.length > 0 && campaign.triggers.length > 0
  );
};

export { getCampaignsForFrontend };
