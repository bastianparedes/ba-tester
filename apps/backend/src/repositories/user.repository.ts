import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { TypeRole } from '../../../domain/types/role';
import type { TypeUser } from '../../../domain/types/user';
import { getPasswordHashed } from '../libs/auth/password';
import db from './postgres/client';
import * as schema from './postgres/schema';

@Injectable()
export class UserRepository {
  get = async ({ userId }: { userId: TypeUser['id'] }): Promise<TypeUser | null> => {
    const result = await db.query.users.findFirst({
      columns: {
        passwordHash: false,
      },
      where: eq(schema.users.id, userId),
      with: {
        role: {
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
        },
      },
    });

    if (!result) return null;

    const { role, ...baseUser } = result;
    const { rolePermissions, ...baseRole } = role;

    const correctRole = {
      ...baseRole,
      permissions: rolePermissions.map((rp) => rp.permission.name),
    };

    const fullUser = {
      ...baseUser,
      role: correctRole,
    };
    return fullUser;
  };

  create = async (data: { name: TypeUser['name']; email: TypeUser['email']; password: string; roleId: TypeRole['id'] }) => {
    await db.insert(schema.users).values({
      name: data.name,
      email: data.email,
      passwordHash: getPasswordHashed(data.password),
      roleId: data.roleId,
    });
  };

  update = async (
    { userId }: { userId: TypeUser['id'] },
    updates: {
      name: TypeUser['name'];
      email: TypeUser['email'];
      roleId: TypeUser['roleId'];
    },
  ) => {
    await db.update(schema.users).set(updates).where(eq(schema.users.id, userId));
  };

  getForLogin = async ({ email }: { email: TypeUser['email'] }): Promise<{ id: TypeUser['id']; email: TypeUser['email']; passwordHash: string }> => {
    const user = await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        passwordHash: true,
      },
      where: eq(schema.users.email, email),
    });

    if (!user) throw new Error('User not found');
    return user;
  };

  getAll = async (): Promise<TypeUser[]> => {
    const results = await db.query.users.findMany({
      columns: {
        passwordHash: false,
      },
      with: {
        role: {
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
        },
      },
    });

    const users = results.map((result) => {
      const { role, ...baseUser } = result;
      const { rolePermissions, ...baseRole } = role;

      const correctRole = {
        ...baseRole,
        permissions: rolePermissions.map((rp) => rp.permission.name),
      };
      return {
        ...baseUser,
        role: correctRole,
      };
    });
    return users;
  };

  getAllWithRoleId = async ({ roleId }: { roleId: TypeRole['id'] }): Promise<Omit<TypeUser, 'role'>[]> => {
    const results = await db.query.users.findMany({
      columns: {
        passwordHash: false,
      },
      where: eq(schema.users.roleId, roleId),
    });
    return results;
  };

  remove = async ({ userId }: { userId: TypeUser['id'] }) => {
    await db.delete(schema.users).where(eq(schema.users.id, userId));
  };
}
