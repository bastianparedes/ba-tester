import { relations } from 'drizzle-orm';
import { boolean, integer, jsonb, pgEnum, pgTable, primaryKey, serial, varchar } from 'drizzle-orm/pg-core';

import commonConstants from '../../../../domain/constants';
import type { TypeCampaign } from '../../../../domain/types/campaign';

export const statusEnum = pgEnum('status_enum', commonConstants.campaignStatus);

// TENANTS
export const tenants = pgTable('tenants', {
  description: varchar('description', { length: 1024 }).notNull(),
  domain: varchar('domain', { length: 255 }).notNull(),
  id: serial('id').primaryKey().unique().notNull(),

  name: varchar('name', { length: 255 }).notNull(),
});

// EXECUTION GROUPS
export const executionGroups = pgTable('execution_groups', {
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  onlyCampaignsPreviouslyExecuted: boolean('only_campaigns_previously_executed').notNull(),
  onlyOneCampaignPerPageLoad: boolean('only_one_campaign_per_page_load').notNull(),
  tenantId: integer('tenant_id')
    .notNull()
    .references(() => tenants.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  waitForEveryCampaignToBeEvaluated: boolean('wait_for_every_campaign_to_be_evaluated').notNull(),
});

// CAMPAIGNS
export const campaigns = pgTable('campaigns', {
  executionGroupId: integer('execution_group_id').references(() => executionGroups.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).notNull().default(''),
  requirements: jsonb('requirements').$type<TypeCampaign['requirements']>().notNull(),
  status: statusEnum('status').notNull().default('inactive'),
  tenantId: integer('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade', onUpdate: 'cascade' }),

  triggers: jsonb('triggers').$type<TypeCampaign['triggers']>().notNull(),
  variations: jsonb('variations').$type<TypeCampaign['variations']>().notNull(),
});

// PERMISSIONS
export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).unique().notNull(),
});

// ROLES
export const roles = pgTable('roles', {
  description: varchar('description', { length: 1024 }).notNull(),
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).unique().notNull(),
});

export const rolePermissions = pgTable(
  'role_permissions',
  {
    permissionId: integer('permission_id')
      .notNull()
      .references(() => permissions.id, { onDelete: 'cascade' }),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

// USERS
export const users = pgTable('users', {
  email: varchar('email', { length: 255 }).unique().notNull(),
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

// -------------------- RELATIONS --------------------

export const tenantsRelations = relations(tenants, ({ many }) => ({
  campaigns: many(campaigns),
}));

export const executionGroupsRelations = relations(executionGroups, ({ one, many }) => ({
  campaigns: many(campaigns),
  tenant: one(tenants, {
    fields: [executionGroups.tenantId],
    references: [tenants.id],
  }),
}));

export const campaignsRelations = relations(campaigns, ({ one }) => ({
  executionGroup: one(executionGroups, {
    fields: [campaigns.executionGroupId],
    references: [executionGroups.id],
  }),
  tenant: one(tenants, {
    fields: [campaigns.tenantId],
    references: [tenants.id],
  }),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  users: many(users),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
}));

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));
