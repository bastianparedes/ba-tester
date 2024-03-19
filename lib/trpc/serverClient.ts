import { httpBatchLink } from '@trpc/client';

import { url } from './config';
import { appRouter } from './appRouter';

const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url
    })
  ]
});

export { serverClient };
