import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import commonConstants from '../../config/common/constants';
import type { CampaignExtendedWithoutDate } from '../../types/databaseObjects';

export const Campaign = sqliteTable('Campaign', {
  id: integer('id', { mode: 'number' })
    .notNull()
    .primaryKey({ autoIncrement: true }),
  lastModifiedDate: integer('lastModifiedDate', {
    mode: 'timestamp'
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  name: text('name', { length: 100 }).notNull().default(''),
  requirements: text('requirements', {
    mode: 'json'
  })
    .$type<CampaignExtendedWithoutDate['requirements']>()
    .notNull(),
  status: text('status', {
    enum: commonConstants.campaignStatus
  })
    .notNull()
    .default('inactive'),
  triggers: text('triggers', {
    mode: 'json'
  })
    .$type<CampaignExtendedWithoutDate['triggers']>()
    .notNull(),
  variations: text('variations', {
    mode: 'json'
  })
    .$type<CampaignExtendedWithoutDate['variations']>()
    .notNull()
});
