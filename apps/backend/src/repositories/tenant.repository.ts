import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { TypeTenant } from '../../../domain/types';
import db from './postgres/client';
import * as schema from './postgres/schema';

@Injectable()
export class TenantRepository {
  create = async ({ name, description, domain }: { name: TypeTenant['name']; description: TypeTenant['description']; domain: TypeTenant['domain'] }) => {
    const results = await db
      .insert(schema.tenants)
      .values({
        name,
        description,
        domain,
      })
      .returning();
    return results[0];
  };

  update = async (
    tenantId: TypeTenant['id'],
    values: {
      name: TypeTenant['name'];
      description: TypeTenant['description'];
      domain: TypeTenant['domain'];
    },
  ) => {
    const result = await db
      .update(schema.tenants)
      .set({
        name: values.name,
        description: values.description,
        domain: values.domain,
      })
      .where(eq(schema.tenants.id, tenantId))
      .returning();
    return result[0];
  };

  get = async ({ tenantId }: { tenantId: number }) => {
    const tenant = await db.query.tenants.findFirst({
      where: eq(schema.tenants.id, tenantId),
    });
    return tenant;
  };

  getAll = async () => {
    const tenants = await db.select().from(schema.tenants);
    return tenants;
  };

  remove = async ({ tenantId }: { tenantId: TypeTenant['id'] }) => {
    const result = await db.delete(schema.tenants).where(eq(schema.tenants.id, tenantId)).returning();
    return result[0];
  };
}
