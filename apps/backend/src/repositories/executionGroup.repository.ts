import { Injectable } from '@nestjs/common';
import { and, asc, desc, eq, ilike, inArray, sql } from 'drizzle-orm';
import type { TypeCampaign, TypeDirection, TypeExecutionGroup, TypeOrderCampaignsBy, TypeTenant } from '../../../domain/types';
import db from './postgres/client';
import * as schema from './postgres/schema';

@Injectable()
export class ExecutionGroupRepository {
  create = async ({ tenantId }: { tenantId: TypeTenant['id'] }, values: Omit<Omit<TypeExecutionGroup, 'id'>, 'tenantId'>, campaignIds: TypeCampaign['id'][]) => {
    const result = await db.transaction(async (tx) => {
      const [result] = await tx
        .insert(schema.executionGroups)
        .values({
          ...values,
          tenantId,
        })
        .returning();

      await tx
        .update(schema.campaigns)
        .set({
          executionGroupId: result.id,
        })
        .where(and(eq(schema.campaigns.tenantId, tenantId), inArray(schema.campaigns.id, campaignIds)));

      return result;
    });

    return result;
  };

  update = async (
    { tenantId, executionGroupId }: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] },
    values: Omit<Omit<TypeExecutionGroup, 'id'>, 'tenantId'>,
    campaignIds: TypeCampaign['id'][],
  ) => {
    const result = await db.transaction(async (tx) => {
      const [result] = await tx
        .update(schema.executionGroups)
        .set(values)
        .where(and(eq(schema.executionGroups.tenantId, tenantId), eq(schema.executionGroups.id, executionGroupId)))
        .returning();

      const campaignIdObjects = await tx
        .select({ id: schema.campaigns.id })
        .from(schema.campaigns)
        .where(and(eq(schema.campaigns.tenantId, tenantId), eq(schema.campaigns.executionGroupId, executionGroupId)));
      const currentCampaignIdsInExecutionGroup = campaignIdObjects.map((campaign) => campaign.id);

      const campaignIdsToRemoveFromExecutionGroup = currentCampaignIdsInExecutionGroup.filter((campaignId) => !campaignIds.includes(campaignId));
      await tx
        .update(schema.campaigns)
        .set({
          executionGroupId: null,
        })
        .where(and(eq(schema.campaigns.tenantId, tenantId), inArray(schema.campaigns.id, campaignIdsToRemoveFromExecutionGroup)));

      const campaignIdsToAddToExecutionGroup = campaignIds.filter((campaignId) => !currentCampaignIdsInExecutionGroup.includes(campaignId));
      await tx
        .update(schema.campaigns)
        .set({
          executionGroupId: executionGroupId,
        })
        .where(and(eq(schema.campaigns.tenantId, tenantId), inArray(schema.campaigns.id, campaignIdsToAddToExecutionGroup)));

      return result;
    });

    return result;
  };

  remove = async ({ tenantId, executionGroupId }: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] }) => {
    const result = await db.transaction(async (tx) => {
      await tx
        .update(schema.campaigns)
        .set({
          executionGroupId: null,
        })
        .where(and(eq(schema.campaigns.tenantId, tenantId), eq(schema.campaigns.executionGroupId, executionGroupId)));
      const [result] = await tx
        .delete(schema.executionGroups)
        .where(and(eq(schema.executionGroups.tenantId, tenantId), eq(schema.executionGroups.id, executionGroupId)))
        .returning();

      return result;
    });

    return result;
  };

  getMany = async (
    { tenantId }: { tenantId: TypeTenant['id'] },
    {
      textSearch,
      quantity,
      page,
      orderDirection,
      orderBy,
    }: {
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

    const executionGroups = await db
      .select({
        id: schema.executionGroups.id,
        name: schema.executionGroups.name,
        strategy: schema.executionGroups.strategy,
        persistCampaignAcrossReloads: schema.executionGroups.persistCampaignAcrossReloads,
        tenantId: schema.executionGroups.tenantId,
        campaignsCount: sql<number>`count(${schema.campaigns.id})`,
      })
      .from(schema.executionGroups)
      .where(and(eq(schema.executionGroups.tenantId, tenantId), ilike(schema.executionGroups.name, treatedTextSearch)))
      .leftJoin(schema.campaigns, eq(schema.campaigns.executionGroupId, schema.executionGroups.id))
      .groupBy(schema.executionGroups.id)
      .orderBy(sort(schema.executionGroups[orderBy]))
      .limit(quantity)
      .offset(page * quantity);

    const [{ count }] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(schema.executionGroups)
      .where(and(eq(schema.executionGroups.tenantId, tenantId), ilike(schema.executionGroups.name, treatedTextSearch)));

    return {
      executionGroups,
      count: Number(count),
    };
  };

  get = async ({ tenantId, executionGroupId }: { tenantId: TypeTenant['id']; executionGroupId: TypeExecutionGroup['id'] }) => {
    const result = await db.query.executionGroups.findFirst({
      where: and(eq(schema.executionGroups.tenantId, tenantId), eq(schema.executionGroups.id, executionGroupId)),
      with: {
        campaigns: {
          columns: {
            requirements: false,
            triggers: false,
            variations: false,
          },
        },
      },
    });

    if (result) {
      const { campaigns, ...executionGroup } = result;
      return {
        executionGroup,
        campaigns,
      };
    }
    return result;
  };

  getAllForScript = async ({ tenantId }: { tenantId: TypeTenant['id'] }) => {
    const executionGroups = await db.query.executionGroups.findMany({
      columns: {
        tenantId: false,
      },
      where: eq(schema.executionGroups.tenantId, tenantId),
      with: {
        campaigns: {
          columns: {
            id: true,
            name: true,
            requirements: true,
            triggers: true,
            variations: true,
          },
          where: eq(schema.campaigns.status, 'active'),
        },
      },
    });
    return executionGroups.filter((executionGroup) => {
      const campaigns = executionGroup.campaigns.filter((campaign) => campaign.variations.length > 0 && campaign.triggers.length > 0);
      return campaigns.length > 0;
    });
  };
}
