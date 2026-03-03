import { Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import type { TypeRole } from '../../../domain/types';
import db from './postgres/client';
import * as schema from './postgres/schema';

@Injectable()
export class RoleRepository {
  get = async ({ id }: { id: TypeRole['id'] }): Promise<TypeRole | null> => {
    const result = await db.query.roles.findFirst({
      where: eq(schema.roles.id, id),
      with: {
        rolePermissions: {
          with: {
            permission: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!result) return null;
    const { rolePermissions, ...baseRole } = result;
    const role = {
      ...baseRole,
      permissions: rolePermissions.map((rp) => rp.permission.name),
    };
    return role;
  };

  create = async (data: Omit<Omit<TypeRole, 'id'>, 'permissions'>) => {
    await db.transaction(async (tx) => {
      await tx
        .insert(schema.roles)
        .values({
          name: data.name,
          description: data.description,
        })
        .returning();
    });
  };

  update = async ({ roleId }: { roleId: TypeRole['id'] }, updates: Omit<TypeRole, 'id'>): Promise<TypeRole> => {
    const currentRole = await this.get({ id: roleId });
    if (!currentRole) throw new Error('Role not found');

    const updatedRole = await db.transaction(async (tx) => {
      const [updatedRole] = await tx
        .update(schema.roles)
        .set({
          name: updates.name,
          description: updates.description,
        })
        .where(eq(schema.roles.id, roleId))
        .returning();

      await tx.delete(schema.rolePermissions).where(eq(schema.rolePermissions.roleId, roleId));

      if (updates.permissions.length > 0) {
        await tx
          .insert(schema.permissions)
          .values(
            updates.permissions.map((permission) => ({
              name: permission,
            })),
          )
          .returning()
          .onConflictDoNothing();
  
        const permissions = await tx.query.permissions.findMany({
          where: inArray(schema.permissions.name, updates.permissions)
        });
  
        await tx
          .insert(schema.rolePermissions)
          .values(
            permissions.map((permission) => ({
              roleId,
              permissionId: permission.id,
            })),
          )
          .onConflictDoNothing();
        
      }

      return updatedRole;
    });

    return {
      ...updatedRole,
      permissions: updates.permissions,
    };
  };

  getAll = async (): Promise<TypeRole[]> => {
    const results = await db.query.roles.findMany({
      with: {
        rolePermissions: {
          with: {
            permission: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });

    const roles = results.map((result) => {
      const { rolePermissions, ...baseRole } = result;
      const role = {
        ...baseRole,
        permissions: rolePermissions.map((rp) => rp.permission.name),
      };
      return role;
    });
    return roles;
  };

  remove = async ({ roleId }: { roleId: TypeRole['id'] }) => {
    await db.delete(schema.roles).where(eq(schema.roles.id, roleId));
  };
}
