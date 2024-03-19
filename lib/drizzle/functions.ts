import { and, asc, desc, eq, inArray, like, sql } from 'drizzle-orm';

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
  return await db
    .insert(schema.Campaign)
    .values({
      lastModifiedDate: new Date(),
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
      lastModifiedDate: new Date(),
      name: values.name,
      requirements: values.requirements,
      status: values.status,
      triggers: values.triggers,
      variations: values.variations
    })
    .where(eq(schema.Campaign.id, id))
    .returning();
};

const getCampaigns = async ({
  statusList,
  name,
  quantity,
  page,
  orderDirection,
  orderBy
}: {
  statusList: CampaignExtendedWithoutDate['status'][];
  name: string;
  quantity: number;
  page: number;
  orderDirection: 'asc' | 'desc';
  orderBy: 'status' | 'name' | 'id' | 'lastModifiedDate';
}) => {
  const sort = {
    asc,
    desc
  }[orderDirection];

  const campaigns = await db
    .select()
    .from(schema.Campaign)
    .where(
      and(
        like(schema.Campaign.name, '%' + name.trim().split('').join('%') + '%'),
        inArray(schema.Campaign.status, statusList)
      )
    )
    .orderBy(sort(schema.Campaign[orderBy]))
    .limit(quantity)
    .offset(page * quantity);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`
    })
    .from(schema.Campaign)
    .where(
      and(
        like(schema.Campaign.name, name.trim().split('').join('%') + '%'),
        inArray(schema.Campaign.status, statusList)
      )
    );

  return {
    campaigns,
    count: Number(count)
  };
};

export { insertCampaign, updateCampaign, getCampaigns };
