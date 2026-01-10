import { cleanEnv, str, makeValidator } from 'envalid';
import { z } from 'zod';

export const superAdminsValidator = makeValidator((value: string) => {
  const UsersArraySchema = z
    .array(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .min(2)
    .refine((users) => {
      const emails = users.map((u) => u.email);
      return new Set(emails).size === emails.length;
    });

  try {
    const json = JSON.parse(value);
    return UsersArraySchema.parse(json);
  } catch {
    throw new Error(
      'SUPER_ADMINS must be a valid JSON array with at least two users. Each user must include a name, email, password address and a password.',
    );
  }
});

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  JWT_SECRET: str(),
  DATABASE_URL_POSTGRES: str(),
  DATABASE_URL_MONGODB: str(),
  DATABASE_URL_REDIS: str(),
  SUPER_ADMINS: superAdminsValidator(),
});
