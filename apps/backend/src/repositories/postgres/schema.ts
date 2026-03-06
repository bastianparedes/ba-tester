import { relations } from 'drizzle-orm';
import { boolean, integer, jsonb, pgEnum, pgTable, primaryKey, serial, varchar } from 'drizzle-orm/pg-core';

import commonConstants from '../../../../domain/constants';
import type { TypeCampaign } from '../../../../domain/types/campaign';

export const statusEnum = pgEnum('status_enum', commonConstants.campaignStatus);

// TENANTS
export const tenants = pgTable('tenants', {
  id: serial('id').primaryKey().unique().notNull(),

  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  domain: varchar('domain', { length: 255 }).notNull(),
});

// EXECUTION GROUPS
export const executionGroups = pgTable('execution_groups', {
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  waitForEveryCampaignToBeEvaluated: boolean('wait_for_every_campaign_to_be_evaluated').notNull(),
  onlyOneCampaignPerPageLoad: boolean('only_one_campaign_per_page_load').notNull(),
  onlyCampaignsPreviouslyExecuted: boolean('only_campaigns_previously_executed').notNull(),
  tenantId: integer('tenant_id')
    .notNull()
    .references(() => tenants.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

// CAMPAIGNS
export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey().unique().notNull(),
  tenantId: integer('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  executionGroupId: integer('execution_group_id').references(() => executionGroups.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull().default(''),
  requirements: jsonb('requirements').$type<TypeCampaign['requirements']>().notNull(),
  status: statusEnum('status').notNull().default('inactive'),

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
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
});

export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => permissions.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

// USERS
export const users = pgTable('users', {
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
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
  tenant: one(tenants, {
    fields: [executionGroups.tenantId],
    references: [tenants.id],
  }),
  campaigns: many(campaigns),
}));

export const campaignsRelations = relations(campaigns, ({ one }) => ({
  tenant: one(tenants, {
    fields: [campaigns.tenantId],
    references: [tenants.id],
  }),
  executionGroup: one(executionGroups, {
    fields: [campaigns.executionGroupId],
    references: [executionGroups.id],
  }),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
  rolePermissions: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
}));

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));
