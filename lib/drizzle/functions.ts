import { and, asc, desc, eq, inArray, like, sql } from 'drizzle-orm';

import * as schema from './schema';
import type {
  AudienceExtendedWithoutDate,
  CampaignExtendedWithoutDate
} from '../../types/databaseObjects';

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

const insertAudience = async ({
  name,
  requirements,
  status
}: {
  name: string;
  requirements: AudienceExtendedWithoutDate['requirements'];
  status: AudienceExtendedWithoutDate['status'];
}) => {
  return await db
    .insert(schema.Audience)
    .values({
      name,
      requirements,
      status
    })
    .returning();
};

const updateAudience = async (
  id: number,
  values: {
    name: string;
    requirements: AudienceExtendedWithoutDate['requirements'];
    status: AudienceExtendedWithoutDate['status'];
  }
) => {
  return await db
    .update(schema.Audience)
    .set({
      lastModifiedDate: schema.Audience.lastModifiedDate.default,
      name: values.name,
      requirements: values.requirements,
      status: values.status
    })
    .where(eq(schema.Audience.id, id))
    .returning();
};

const getAudiences = async ({
  statusList,
  name,
  quantity,
  page,
  orderDirection,
  orderBy
}: {
  statusList: AudienceExtendedWithoutDate['status'][];
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

  const audiences = await db
    .select()
    .from(schema.Audience)
    .where(
      and(
        like(schema.Audience.name, '%' + name.trim().split('').join('%') + '%'),
        inArray(schema.Audience.status, statusList)
      )
    )
    .orderBy(sort(schema.Audience[orderBy]))
    .limit(quantity)
    .offset(page * quantity);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`
    })
    .from(schema.Audience)
    .where(
      and(
        like(schema.Audience.name, name.trim().split('').join('%') + '%'),
        inArray(schema.Audience.status, statusList)
      )
    );

  return {
    audiences,
    count: Number(count)
  };
};

export {
  insertCampaign,
  updateCampaign,
  getCampaigns,
  insertAudience,
  updateAudience,
  getAudiences
};
