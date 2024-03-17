import type { Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    authToken: process.env.DATABASE_TOKEN ?? '',
    url: process.env.DATABASE_URL ?? ''
  },
  driver: 'turso',
  out: './drizzle',
  schema: './lib/drizzle/schema.ts'
} satisfies Config;
