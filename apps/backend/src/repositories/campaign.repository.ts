import { Injectable } from '@nestjs/common';
import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import type { TypeCampaign, TypeDirection, TypeOrderCampaignsBy, TypeTenant } from '../../../domain/types';
import db from './postgres/client';
import * as schema from './postgres/schema';

@Injectable()
export class CampaignRepository {
  create = async ({ tenantId }: { tenantId: Exclude<TypeCampaign['tenantId'], undefined> }, values: Omit<Omit<Omit<TypeCampaign, 'id'>, 'tenantId'>, 'executionGroupId'>) => {
    const result = await db
      .insert(schema.campaigns)
      .values({
        ...values,
        tenantId,
      })
      .returning();
    return result;
  };

  update = async (
    { tenantId, campaignId }: { tenantId: TypeTenant['id']; campaignId: TypeCampaign['id'] },
    values: Omit<Omit<Omit<TypeCampaign, 'id'>, 'tenantId'>, 'executionGroupId'>,
  ) => {
    const result = await db
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
    return result;
  };

  remove = async ({ tenantId, campaignId }: { tenantId: TypeTenant['id']; campaignId: TypeCampaign['id'] }) => {
    const [result] = await db
      .delete(schema.campaigns)
      .where(and(eq(schema.campaigns.tenantId, tenantId), eq(schema.campaigns.id, campaignId)))
      .returning();
    return result;
  };

  getMany = async (
    { tenantId }: { tenantId: TypeTenant['id'] },
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
      orderDirection: TypeDirection;
      orderBy: TypeOrderCampaignsBy;
    },
  ) => {
    const sort = {
      asc,
      desc,
    }[orderDirection];

    const treatedTextSearch = `%${textSearch.trim()}%`;

    const campaigns = await db
      .select({
        id: schema.campaigns.id,
        name: schema.campaigns.name,
        status: schema.campaigns.status,
        tenantId: schema.campaigns.tenantId,
        executionGroupId: schema.campaigns.executionGroupId,
        executionGroup: schema.executionGroups,
      })
      .from(schema.campaigns)
      .leftJoin(schema.executionGroups, eq(schema.campaigns.executionGroupId, schema.executionGroups.id))
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

  getAllLight = async ({ tenantId }: { tenantId: TypeTenant['id'] }) => {
    const campaigns = await db.query.campaigns.findMany({
      columns: {
        triggers: false,
        requirements: false,
        variations: false,
      },
      where: eq(schema.campaigns.tenantId, tenantId),
    });
    return campaigns;
  };

  get = async ({ tenantId, campaignId }: { tenantId: TypeTenant['id']; campaignId: TypeCampaign['id'] }) =>
    await db.query.campaigns.findFirst({
      where: and(eq(schema.campaigns.tenantId, tenantId), eq(schema.campaigns.id, campaignId)),
      with: {
        executionGroup: true,
      },
    });

  getAllForScript = async ({ tenantId }: { tenantId: TypeTenant['id'] }) => {
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
}
