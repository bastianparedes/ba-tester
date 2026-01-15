import { cleanEnv, makeValidator, num, str } from 'envalid';
import { z } from 'zod';

export const superAdminsValidator = makeValidator((value: string) => {
  const UsersArraySchema = z
    .array(
      z.object({
        name: z.string(),
        email: z.email(),
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
    const validated = UsersArraySchema.parse(json);
    return validated;
  } catch {
    throw new Error('SUPER_ADMINS must be a valid JSON array with at least two users. Each user must include a name, email, password address and a password.');
  }
});

export default cleanEnv(process.env, {
  JWT_SECRET: str(),
  DATABASE_URL_POSTGRES: str(),
  DATABASE_URL_MONGODB: str(),
  DATABASE_URL_REDIS: str(),
  SALT_ROUNDS: num(),
  SUPER_ADMINS: superAdminsValidator(),
});
