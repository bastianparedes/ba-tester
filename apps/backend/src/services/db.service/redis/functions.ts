import client from './client';

/* ============================================================
 * Generic cache helpers
 * ============================================================ */

const cache = {
  async set({ key, value, minutes }: { key: string; value: string; minutes: number }) {
    try {
      await client.set(key, value, { EX: minutes * 60 });
    } catch (err) {
      console.error('Redis SET error:', err);
    }
  },

  async get({ key }: { key: string }) {
    try {
      return await client.get(key);
    } catch (err) {
      console.error('Redis GET error:', err);
      return null;
    }
  },

  async del({ key }: { key: string }) {
    try {
      await client.del(key);
    } catch (err) {
      console.error('Redis DEL error:', err);
    }
  },
};

/* ============================================================
 * Scripts cache
 * ============================================================ */

export const scripts = {
  async save({ tenantId, code }: { tenantId: number; code: string }) {
    const key = `tenant:${tenantId}:public_script`;
    const minutes = 1;
    await cache.set({ key, value: code, minutes });
  },

  async get({ tenantId }: { tenantId: number }) {
    const key = `tenant:${tenantId}:public_script`;
    return cache.get({ key });
  },
};
