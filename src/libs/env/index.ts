import { cleanEnv, str } from 'envalid';

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  /* JWT_SECRET: str(), */
  DATABASE_URL: str(),
  CACHE_URL: str(),
});
