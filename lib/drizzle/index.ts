import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

const client = createClient({
  authToken: process.env.DATABASE_TOKEN,
  url: process.env.DATABASE_URL ?? ''
});

export default drizzle(client, { schema });
