import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL_POSTGRES: z.string().min(1),
  DATABASE_URL_REDIS: z.string().min(1),
  DOMAIN: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().default(4000),
  SALT_ROUNDS: z.coerce.number().int(),
  SUPER_ADMIN_EMAIL: z.email().min(1),
  SUPER_ADMIN_PASSWORD: z.string().min(1),
});

export const env = envSchema.parse({
  DATABASE_URL_POSTGRES: process.env.DATABASE_URL_POSTGRES,
  DATABASE_URL_REDIS: process.env.DATABASE_URL_REDIS,
  DOMAIN: process.env.DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
});
