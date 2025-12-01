import { createTRPCReact } from '@trpc/react-query';

import { appRouter } from './appRouter';

const trpcClient = createTRPCReact<typeof appRouter>({});

export { trpcClient };
