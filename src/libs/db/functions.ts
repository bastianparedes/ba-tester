import { and, asc, desc, eq, inArray, like, sql } from 'drizzle-orm';

import * as schema from './schema';
import type { TypeOrderBy, TypeOrderDirection, TypeCampaign, TypeCampaignScript } from '@/types/db';

import db from './client';

export const insertCampaign = async ({
  name,
  requirements,
  status,
  triggers,
  variations,
}: {
  name: string;
  requirements: TypeCampaign['requirements'];
  status: TypeCampaign['status'];
  triggers: TypeCampaign['triggers'];
  variations: TypeCampaign['variations'];
}) => {
  return await db
    .insert(schema.campaigns)
    .values({
      name,
      requirements,
      status,
      triggers,
      variations,
    })
    .returning();
};

export const updateCampaign = async (
  id: number,
  values: {
    name: string;
    requirements: TypeCampaign['requirements'];
    status: TypeCampaign['status'];
    triggers: TypeCampaign['triggers'];
    variations: TypeCampaign['variations'];
  },
) => {
  return await db
    .update(schema.campaigns)
    .set({
      name: values.name,
      requirements: values.requirements,
      status: values.status,
      triggers: values.triggers,
      variations: values.variations,
    })
    .where(eq(schema.campaigns.id, id))
    .returning();
};

export const getCampaigns = async ({
  statusList,
  name,
  quantity,
  page,
  orderDirection,
  orderBy,
}: {
  statusList: TypeCampaign['status'][];
  name: string;
  quantity: number;
  page: number;
  orderDirection: TypeOrderDirection;
  orderBy: TypeOrderBy;
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

export const getCampaign = async ({ id }: { id: number }) =>
  await db.query.campaigns.findFirst({
    where: eq(schema.campaigns.id, id),
  });

export const getCampaignsForScript = async (): Promise<TypeCampaignScript[]> => {
  const campaigns = await db.query.campaigns.findMany({
    columns: {
      id: true,
      name: true,
      requirements: true,
      triggers: true,
      variations: true,
    },
    where: (campaign) => eq(campaign.status, 'active'),
  });

  return campaigns.filter((campaign) => campaign.variations.length > 0 && campaign.triggers.length > 0);
};
