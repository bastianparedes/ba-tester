import { plainToInstance, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, validateSync } from 'class-validator';

class ConfigDto {
  @IsString()
  NODE_ENV: 'development' | 'test' | 'production';

  @IsString()
  DOMAIN: string;

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
  PORT: number = 4000;

  @IsInt()
  @Type(() => Number)
  SALT_ROUNDS: number;

  @IsString()
  @IsNotEmpty()
  SUPER_ADMIN_EMAIL: string;

  @IsString()
  @IsNotEmpty()
  SUPER_ADMIN_PASSWORD: string;
}

export const env = plainToInstance(ConfigDto, {
  NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'test' | 'production',
  PORT: process.env.PORT || 4000,
  DOMAIN: process.env.DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL_POSTGRES: process.env.DATABASE_URL_POSTGRES,
  DATABASE_URL_MONGODB: process.env.DATABASE_URL_MONGODB,
  DATABASE_URL_REDIS: process.env.DATABASE_URL_REDIS,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
});

const errors = validateSync(env, { whitelist: true, forbidNonWhitelisted: true });
if (errors.length > 0) {
  throw new Error(`Invalid environment variables: ${JSON.stringify(errors, null, 2)}`);
}
