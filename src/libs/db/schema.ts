import { pgTable, serial, timestamp, jsonb, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

import commonConstants from '../../config/common/constants';
import type { CampaignExtendedWithoutDate } from '../../types/databaseObjects';

export const statusEnum = pgEnum('status_enum', commonConstants.campaignStatus);

export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey().unique(),

  lastModifiedDate: timestamp('last_modified_date', {
    withTimezone: false,
    mode: 'date',
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  name: varchar('name', { length: 255 }).notNull().default(''),
  requirements: jsonb('requirements').$type<CampaignExtendedWithoutDate['requirements']>().notNull(),
  status: statusEnum('status').notNull().default('inactive'),

  triggers: jsonb('triggers').$type<CampaignExtendedWithoutDate['triggers']>().notNull(),
  variations: jsonb('variations').$type<CampaignExtendedWithoutDate['variations']>().notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey().unique().notNull(),

  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
});
