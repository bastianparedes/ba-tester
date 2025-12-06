import { pgTable, serial, jsonb, varchar, pgEnum } from 'drizzle-orm/pg-core';

import commonConstants from '../../config/common/constants';
import type { TypeCampaignExtended } from '../../types/db';

export const statusEnum = pgEnum('status_enum', commonConstants.campaignStatus);

export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey().unique(),

  name: varchar('name', { length: 255 }).notNull().default(''),
  requirements: jsonb('requirements').$type<TypeCampaignExtended['requirements']>().notNull(),
  status: statusEnum('status').notNull().default('inactive'),

  triggers: jsonb('triggers').$type<TypeCampaignExtended['triggers']>().notNull(),
  variations: jsonb('variations').$type<TypeCampaignExtended['variations']>().notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey().unique().notNull(),

  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
});
