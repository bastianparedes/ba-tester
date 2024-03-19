import { eq } from 'drizzle-orm';

import commonConstants from '../../config/common/constants';
import drizzle from '../../lib/drizzle/index';

const getCampaignsForFrontend = async () => {
  let campaigns = await drizzle.query.Campaign.findMany({
    columns: {
      lastModifiedDate: false
    },
    where: (campaign) => eq(campaign.status, 'active')
  });

  campaigns = campaigns.filter(
    (campaign) => campaign.variations.length > 0 && campaign.triggers.length > 0
  );
  return campaigns;
};

export { getCampaignsForFrontend };
