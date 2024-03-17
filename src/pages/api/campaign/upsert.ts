import { eq } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next';

import drizzle from '../../../../lib/drizzle';
import { Campaign } from '../../../../lib/drizzle/schema';
import { validateCampaign } from '../../../../types/jsonValidators/campaign';
import build from '../../../../utils/build';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { campaign } = JSON.parse(req.body);
  const isCampaign = validateCampaign(campaign);
  if (!isCampaign) return res.status(400).json({ success: false });

  const requirementsAreValid = validateCampaign(campaign);
  if (!requirementsAreValid) return res.json({ success: false });

  const variations = campaign.variations.map((variation, index) => ({
    css: variation.css.trim(),
    html: variation.html.trim(),
    id: index + 1,
    javascript: variation.javascript.trim(),
    name: variation.name.trim(),
    traffic: variation.traffic
  }));

  const idCampaign = campaign.id;
  if (idCampaign === undefined) {
    await drizzle.transaction(async (tx) => {
      await tx
        .insert(Campaign)
        .values({
          name: campaign.name.trim(),
          requirements: campaign.requirements,
          status: campaign.status,
          triggers: campaign.triggers,
          variations
        })
        .returning();
    });
  } else {
    await drizzle.transaction(async (tx) => {
      await tx
        .update(Campaign)
        .set({
          lastModifiedDate: Campaign.lastModifiedDate.default,
          name: campaign.name.trim(),
          requirements: campaign.requirements,
          status: campaign.status,
          triggers: campaign.triggers,
          variations
        })
        .where(eq(Campaign.id, idCampaign));
    });
  }

  build();
  return res.json({ success: true });
};

const config = {
  api: {
    bodyParser: true
  }
};

export { config };
export default handler;
