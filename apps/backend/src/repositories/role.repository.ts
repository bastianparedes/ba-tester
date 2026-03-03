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

      const oldPermissions = (
        await tx.query.rolePermissions.findMany({
          where: eq(schema.rolePermissions.roleId, roleId),
          with: {
            permission: true,
          },
        })
      ).map((rp) => rp.permission.name);
      const newPermissions = updates.permissions;

      const removedPermissionsNames = oldPermissions.filter((p) => !newPermissions.includes(p));
      if (removedPermissionsNames.length > 0) {
        const permission = await tx.select({ id: schema.permissions.id }).from(schema.permissions).where(inArray(schema.permissions.name, removedPermissionsNames));

        const ids = permission.map((p) => p.id);
        await tx.delete(schema.rolePermissions).where(inArray(schema.rolePermissions.permissionId, ids));
      }

      const addedPermissionsNames = newPermissions.filter((p) => !oldPermissions.includes(p));
      if (addedPermissionsNames.length > 0) {
        const permissions = await tx
          .insert(schema.permissions)
          .values(addedPermissionsNames.map((name) => ({ name })))
          .onConflictDoNothing()
          .returning();
        if (permissions.length > 0) await tx.insert(schema.rolePermissions).values(permissions.map((permission) => ({ roleId, permissionId: permission.id })));
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
