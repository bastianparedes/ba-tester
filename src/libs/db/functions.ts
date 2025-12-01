import { and, asc, desc, eq, inArray, like, sql } from 'drizzle-orm';

import * as schema from './schema';
import type { CampaignExtendedWithoutDate } from '@/types/databaseObjects';

import db from './client';

const insertCampaign = async ({
  name,
  requirements,
  status,
  triggers,
  variations,
}: {
  name: string;
  requirements: CampaignExtendedWithoutDate['requirements'];
  status: CampaignExtendedWithoutDate['status'];
  triggers: CampaignExtendedWithoutDate['triggers'];
  variations: CampaignExtendedWithoutDate['variations'];
}) => {
  return await db
    .insert(schema.campaigns)
    .values({
      lastModifiedDate: new Date(),
      name,
      requirements,
      status,
      triggers,
      variations,
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
  },
) => {
  return await db
    .update(schema.campaigns)
    .set({
      lastModifiedDate: new Date(),
      name: values.name,
      requirements: values.requirements,
      status: values.status,
      triggers: values.triggers,
      variations: values.variations,
    })
    .where(eq(schema.campaigns.id, id))
    .returning();
};

const getCampaigns = async ({
  statusList,
  name,
  quantity,
  page,
  orderDirection,
  orderBy,
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
    desc,
  }[orderDirection];

  const campaigns = await db
    .select()
    .from(schema.campaigns)
    .where(
      and(
        like(schema.campaigns.name, '%' + name.trim().split('').join('%') + '%'),
        inArray(schema.campaigns.status, statusList),
      ),
    )
    .orderBy(sort(schema.campaigns[orderBy]))
    .limit(quantity)
    .offset(page * quantity);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(schema.campaigns)
    .where(
      and(
        like(schema.campaigns.name, name.trim().split('').join('%') + '%'),
        inArray(schema.campaigns.status, statusList),
      ),
    );

  return {
    campaigns,
    count: Number(count),
  };
};

export { insertCampaign, updateCampaign, getCampaigns };
