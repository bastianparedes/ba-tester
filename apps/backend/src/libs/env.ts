import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString, MinLength, Validate, ValidatorConstraint, ValidatorConstraintInterface, validateSync } from 'class-validator';

class SuperAdmin {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

@ValidatorConstraint({ name: 'UniqueEmails', async: false })
class UniqueEmailsConstraint implements ValidatorConstraintInterface {
  validate(users: SuperAdmin[]) {
    const emails = users.map((u) => u.email);
    return new Set(emails).size === emails.length;
  }

  defaultMessage() {
    return 'SUPER_ADMINS must have unique emails';
  }
}

class ConfigDto {
  @IsString()
  NODE_ENV: 'development' | 'test' | 'production';

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL_POSTGRES: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL_MONGODB: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL_REDIS: string;

  @IsInt()
  @Type(() => Number)
  SALT_ROUNDS: number;

  @IsArray()
  @Validate(UniqueEmailsConstraint)
  @Transform(({ value }) => {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) {
        throw new Error();
      }
      return plainToInstance(SuperAdmin, parsed);
    } catch {
      throw new Error('SUPER_ADMINS must be a valid JSON array with at least two users, each with name, email, and password');
    }
  })
  SUPER_ADMINS: SuperAdmin[];
}

export const env = plainToInstance(ConfigDto, {
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL_POSTGRES: process.env.DATABASE_URL_POSTGRES,
  DATABASE_URL_MONGODB: process.env.DATABASE_URL_MONGODB,
  DATABASE_URL_REDIS: process.env.DATABASE_URL_REDIS,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  SUPER_ADMINS: process.env.SUPER_ADMINS,
});

const errors = validateSync(env, { whitelist: true, forbidNonWhitelisted: true });
if (errors.length > 0) {
  throw new Error(`Invalid environment variables: ${JSON.stringify(errors, null, 2)}`);
}
