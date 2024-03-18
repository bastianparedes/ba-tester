import { eq } from 'drizzle-orm';

import * as schema from './schema';
import type { CampaignExtendedWithoutDate } from '../../types/databaseObjects';

import db from './index';

const insertCampaign = async ({
  name,
  requirements,
  status,
  triggers,
  variations
}: {
  name: string;
  requirements: CampaignExtendedWithoutDate['requirements'];
  status: CampaignExtendedWithoutDate['status'];
  triggers: CampaignExtendedWithoutDate['triggers'];
  variations: CampaignExtendedWithoutDate['variations'];
}) => {
  await db
    .insert(schema.Campaign)
    .values({
      name,
      requirements,
      status,
      triggers,
      variations
    })
    .returning();
};

const updateCampaign = async (
  id: number,
  values: {
    name: string;
    requirements: CampaignExtendedWithoutDate['requirements'];
    status: CampaignExtendedWithoutDate['status'];
    triggers: CampaignExtendedWithoutDate['triggers'];
    variations: CampaignExtendedWithoutDate['variations'];
  }
) => {
  return await db
    .update(schema.Campaign)
    .set({
      lastModifiedDate: schema.Campaign.lastModifiedDate.default,
      name: values.name,
      requirements: values.requirements,
      status: values.status,
      triggers: values.triggers,
      variations: values.variations
    })
    .where(eq(schema.Campaign.id, id))
    .returning();
};

export { insertCampaign, updateCampaign };
