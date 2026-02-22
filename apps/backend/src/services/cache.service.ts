import { Injectable } from '@nestjs/common';

import { createClient } from 'redis';
import { type TypeUser } from '../../../domain/types';
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
      const key = `tenant:${tenantId}:public_script`;
      const minutes = 60;
      await cache.set({ key, value: code, minutes });
    },

    async get({ tenantId }: { tenantId: number }): Promise<string | null> {
      const key = `tenant:${tenantId}:public_script`;
      return cache.get({ key });
    },
  };
  users = {
    async save({ user }: { user: TypeUser }) {
      const key = `user:${user.id}`;
      const minutes = 1;
      await cache.set({ key, value: JSON.stringify(user), minutes });
    },
    async get({ userId }: { userId: TypeUser['id'] }): Promise<TypeUser | null> {
      const key = `user:${userId}`;
      const result = await cache.get({ key });
      if (!result) return null;
      return JSON.parse(result);
    },
    async clear({ userId }: { userId: TypeUser['id'] }) {
      const key = `user:${userId}`;
      await client.del(key);
    },
    async clearAll() {
      const iterator = client.scanIterator({
        MATCH: 'user:*',
        COUNT: 10,
      });
      for await (const key of iterator) {
        await client.del(key);
      }
    },
  };
}
