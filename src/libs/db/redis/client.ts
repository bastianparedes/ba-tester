import { createClient } from 'redis';
import env from '@/libs/env';

const client = createClient({
  url: env.DATABASE_URL_REDIS,
});
await client.connect();

export default client;
