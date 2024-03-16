import type { Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    authToken: process.env.DATABASE_URL ?? '',
    url: process.env.DATABASE_URL_SQL_LITE ?? ''
  },
  driver: 'turso',
  out: './drizzle',
  schema: './lib/drizzle/schema.ts'
} satisfies Config;
