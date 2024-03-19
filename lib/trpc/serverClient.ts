import { httpBatchLink } from '@trpc/client';

import nextConfig from '../../next.config';
import { appRouter } from './appRouter';

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const domain = process.env.DOMAIN ?? 'localhost:3000';
const url = `${protocol}://${domain}${nextConfig.basePath}/api/trpc`;

const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url
    })
  ]
});

export { serverClient };
