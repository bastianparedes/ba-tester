import { createClient } from 'redis';
import env from '../env';

const client = createClient({
  url: env.CACHE_URL,
});
await client.connect();

export default client;
