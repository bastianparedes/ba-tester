import client from './client';

/* ============================================================
 * Utils
 * ============================================================ */

const minutes = (n: number) => n * 60;

/* ============================================================
 * Generic cache helpers
 * ============================================================ */

const cache = {
  async set(key: string, value: string, ttlMinutes?: number) {
    try {
      if (ttlMinutes) {
        await client.set(key, value, { EX: minutes(ttlMinutes) });
      } else {
        await client.set(key, value);
      }
    } catch (err) {
      console.error('Redis SET error:', err);
    }
  },

  async get(key: string) {
    try {
      return await client.get(key);
    } catch (err) {
      console.error('Redis GET error:', err);
      return null;
    }
  },

  async del(key: string) {
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
    await cache.set(key, code, 10);
  },

  async get({ tenantId }: { tenantId: number }) {
    const key = `tenant:${tenantId}:public_script`;
    return cache.get(key);
  },
};
