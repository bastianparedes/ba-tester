import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

import commonConstants from '../../config/common/constants';
import type { CampaignExtendedWithoutDate } from '../../types/databaseObjects';

export const Campaign = pgTable('Campaign', {
  id: serial('id').primaryKey().unique(),

  lastModifiedDate: timestamp('lastModifiedDate', {
    withTimezone: false,
    mode: 'date',
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  name: text('name').notNull().default(''),

  requirements: jsonb('requirements').$type<CampaignExtendedWithoutDate['requirements']>().notNull(),

  status: text('status', {
    enum: commonConstants.campaignStatus,
  })
    .notNull()
    .default('inactive'),

  triggers: jsonb('triggers').$type<CampaignExtendedWithoutDate['triggers']>().notNull(),

  variations: jsonb('variations').$type<CampaignExtendedWithoutDate['variations']>().notNull(),
});
