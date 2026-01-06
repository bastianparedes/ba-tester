import { and, asc, desc, eq, inArray, ilike, or, sql } from 'drizzle-orm';

import * as schema from '../schema';
import type { TypeOrderBy, TypeOrderDirection, TypeCampaign, TypeCampaignScript } from '@/types/db';

import db from '../client';

export const create = async (
  { tenantId }: { tenantId: Exclude<TypeCampaign['tenantId'], undefined> },

  {
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
  },
) => {
  return await db
    .insert(schema.campaigns)
    .values({
      tenantId,
      name,
      requirements,
      status,
      triggers,
      variations,
    })
    .returning();
};

export const update = async (
  { tenantId, campaignId }: { tenantId: number; campaignId: number },
  values: {
    name: TypeCampaign['name'];
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
    .where(and(eq(schema.campaigns.tenantId, tenantId), eq(schema.campaigns.id, campaignId)))
    .returning();
};

export const getMany = async (
  { tenantId }: { tenantId: Exclude<TypeCampaign['tenantId'], undefined> },
  {
    statusList,
    textSearch,
    quantity,
    page,
    orderDirection,
    orderBy,
  }: {
    statusList: TypeCampaign['status'][];
    textSearch: string;
    quantity: number;
    page: number;
    orderDirection: TypeOrderDirection;
    orderBy: TypeOrderBy;
  },
) => {
  const sort = {
    asc,
    desc,
  }[orderDirection];

  const treatedTextSearch = `%${textSearch.trim()}%`;

  const campaigns = await db
    .select()
    .from(schema.campaigns)
    .where(
      and(
        eq(schema.campaigns.tenantId, tenantId),
        or(
          ilike(schema.campaigns.name, treatedTextSearch),
          sql`${schema.campaigns.triggers}::text ILIKE ${treatedTextSearch}`,
          sql`${schema.campaigns.requirements}::text ILIKE ${treatedTextSearch}`,
          sql`${schema.campaigns.variations}::text ILIKE ${treatedTextSearch}`,
        ),
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
        eq(schema.campaigns.tenantId, tenantId),
        or(
          ilike(schema.campaigns.name, treatedTextSearch),
          sql`${schema.campaigns.triggers}::text ILIKE ${treatedTextSearch}`,
          sql`${schema.campaigns.requirements}::text ILIKE ${treatedTextSearch}`,
          sql`${schema.campaigns.variations}::text ILIKE ${treatedTextSearch}`,
        ),
        inArray(schema.campaigns.status, statusList),
      ),
    );

  return {
    campaigns,
    count: Number(count),
  };
};

export const get = async ({ tenantId, campaignId }: { tenantId: number; campaignId: number }) =>
  await db.query.campaigns.findFirst({
    where: and(eq(schema.campaigns.tenantId, tenantId), eq(schema.campaigns.id, campaignId)),
  });

export const getAllForScript = async ({ tenantId }: { tenantId: number }): Promise<TypeCampaignScript[]> => {
  const campaigns = await db.query.campaigns.findMany({
    columns: {
      id: true,
      name: true,
      requirements: true,
      triggers: true,
      variations: true,
    },
    where: (campaign) => and(eq(campaign.tenantId, tenantId), eq(campaign.status, 'active')),
  });

  return campaigns.filter((campaign) => campaign.variations.length > 0 && campaign.triggers.length > 0);
};
