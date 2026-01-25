import client from './client';

/* ============================================================
 * Utils
 * ============================================================ */

const minutes = (n: number) => n * 60;

const safeJsonParse = <T>(value: string): T | null => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

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

/* ============================================================
 * Campaigns / Users watching
 * ============================================================ */

export type UserWatching = {
  id: string;
  name: string;
};

const campaignKey = (tenantId: number, campaignId: number) => `tenant:${tenantId}:campaign:${campaignId}:users`;

export const campaigns = {
  users: {
    async save({ tenantId, campaignId, user }: { tenantId: number; campaignId: number; user: UserWatching }) {
      const key = campaignKey(tenantId, campaignId);

      try {
        await client.sAdd(key, JSON.stringify(user));
        await client.expire(key, minutes(60));

        const users = await client.sMembers(key);

        return users.map((u) => safeJsonParse<UserWatching>(u)).filter(Boolean) as UserWatching[];
      } catch (err) {
        console.error('Redis SADD error:', err);
        return [];
      }
    },

    async get({ tenantId, campaignId }: { tenantId: number; campaignId: number }): Promise<UserWatching[]> {
      const key = campaignKey(tenantId, campaignId);

      try {
        const users = await client.sMembers(key);

        return users.map((u) => safeJsonParse<UserWatching>(u)).filter(Boolean) as UserWatching[];
      } catch (err) {
        console.error('Redis SMEMBERS error:', err);
        return [];
      }
    },

    async remove({ tenantId, campaignId, user }: { tenantId: number; campaignId: number; user: UserWatching }) {
      const key = campaignKey(tenantId, campaignId);

      try {
        await client.sRem(key, JSON.stringify(user));
      } catch (err) {
        console.error('Redis SREM error:', err);
      }
    },

    async clear({ tenantId, campaignId }: { tenantId: number; campaignId: number }) {
      const key = campaignKey(tenantId, campaignId);
      await client.del(key);
    },
  },
};
