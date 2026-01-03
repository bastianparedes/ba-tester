import { and, asc, desc, eq, inArray, like, sql } from 'drizzle-orm';

import * as schema from './schema';
import type { TypeTenant, TypeOrderBy, TypeOrderDirection, TypeCampaign, TypeCampaignScript } from '@/types/db';

import db from './client';

export const insertTenant = async ({
  name,
  description,
  domain,
}: {
  name: TypeTenant['name'];
  description: TypeTenant['description'];
  domain: TypeTenant['domain'];
}) => {
  const results = await db
    .insert(schema.tenants)
    .values({
      name,
      description,
      domain,
    })
    .returning();
  return results[0];
};

export const updateTenant = async (
  tenantId: TypeTenant['id'],
  values: {
    name: TypeTenant['name'];
    description: TypeTenant['description'];
    domain: TypeTenant['domain'];
  },
) => {
  const result = await db
    .update(schema.tenants)
    .set({
      name: values.name,
      description: values.description,
      domain: values.domain,
    })
    .where(eq(schema.tenants.id, tenantId))
    .returning();
  return result[0];
};

export const getTenant = async ({ tenantId }: { tenantId: number }) => {
  const tenant = await db.query.tenants.findFirst({
    where: eq(schema.tenants.id, tenantId),
  });
  return tenant;
};

export const getTenants = async () => {
  const tenants = await db.select().from(schema.tenants).orderBy(asc(schema.tenants.id));
  return tenants;
};

export const insertCampaign = async (
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

export const updateCampaign = async (
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

export const getCampaigns = async (
  { tenantId }: { tenantId: Exclude<TypeCampaign['tenantId'], undefined> },
  {
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
  },
) => {
  const sort = {
    asc,
    desc,
  }[orderDirection];

  const campaigns = await db
    .select()
    .from(schema.campaigns)
    .where(
      and(
        eq(schema.campaigns.tenantId, tenantId),
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

export const getCampaign = async ({ tenantId, campaignId }: { tenantId: number; campaignId: number }) =>
  await db.query.campaigns.findFirst({
    where: and(eq(schema.campaigns.tenantId, tenantId), eq(schema.campaigns.id, campaignId)),
  });

export const getCampaignsForScript = async ({ tenantId }: { tenantId: number }): Promise<TypeCampaignScript[]> => {
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
