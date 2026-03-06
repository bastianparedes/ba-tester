import { Injectable } from '@nestjs/common';

import { createClient } from 'redis';
import { TypeUser } from '../../../domain/types/user';
import { env } from '../libs/env';

const client = createClient({
  url: env.DATABASE_URL_REDIS,
});
client.connect();

/* ============================================================
 * Generic cache helpers
 * ============================================================ */

const cache = {
  async set({ key, value, minutes }: { key: string; value: string; minutes: number }) {
    await client.set(key, value, { EX: minutes * 60 });
  },

  async get({ key }: { key: string }) {
    return await client.get(key);
  },

  async del({ key }: { key: string }) {
    await client.del(key);
  },
};

@Injectable()
export class CacheService {
  scripts = {
    async save({ tenantId, code }: { tenantId: number; code: string }) {
      if (env.NODE_ENV !== 'production') return;
      const key = `tenant:${tenantId}:public_script`;
      const minutes = 1;
      await cache.set({ key, value: code, minutes });
    },

    async get({ tenantId }: { tenantId: number }): Promise<string | null> {
      const key = `tenant:${tenantId}:public_script`;
      return cache.get({ key });
    },
    async del({ tenantId }: { tenantId: number }): Promise<void> {
      const key = `tenant:${tenantId}:public_script`;
      await cache.del({ key });
    },
  };
  users = {
    async save({ user }: { user: TypeUser }) {
      if (env.NODE_ENV !== 'production') return;
      const key = `user:${user.id}`;
      const minutes = 5;
      await cache.set({ key, value: JSON.stringify(user), minutes });
    },
    async get({ userId }: { userId: TypeUser['id'] }): Promise<TypeUser | null> {
      const key = `user:${userId}`;
      const result = await cache.get({ key });
      if (!result) return null;
      return JSON.parse(result);
    },
    async clear({ userIds }: { userIds: TypeUser['id'][] }) {
      const keys = userIds.map((id) => `user:${id}`);
      await client.del(keys);
    },
  };
}
