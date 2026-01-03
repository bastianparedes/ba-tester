import { pgTable, serial, jsonb, varchar, pgEnum, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import commonConstants from '@/config/common/constants';
import type { TypeCampaign } from '../../types/db';

export const statusEnum = pgEnum('status_enum', commonConstants.campaignStatus);

// TENANTS
export const tenants = pgTable('tenants', {
  id: serial('id').primaryKey().unique().notNull(),

  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  domain: varchar('domain', { length: 255 }).notNull(),
});

// CAMPAIGNS
export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey().unique().notNull(),
  tenantId: integer('tenant_id')
    .notNull()
    .references(() => tenants.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  name: varchar('name', { length: 255 }).notNull().default(''),
  requirements: jsonb('requirements').$type<TypeCampaign['requirements']>().notNull(),
  status: statusEnum('status').notNull().default('inactive'),

  triggers: jsonb('triggers').$type<TypeCampaign['triggers']>().notNull(),
  variations: jsonb('variations').$type<TypeCampaign['variations']>().notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey().unique().notNull(),

  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
});

// -------------------- RELATIONS --------------------

export const tenantsRelations = relations(tenants, ({ many }) => ({
  campaigns: many(campaigns),
}));

export const campaignsRelations = relations(campaigns, ({ one }) => ({
  tenant: one(tenants, {
    fields: [campaigns.tenantId],
    references: [tenants.id],
  }),
}));
