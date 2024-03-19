'use client';

import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import path from 'path';
import nextConfig from '../../../next.config';
import { trpcClient } from '../../../lib/trpc/client';

interface Props {
  children: React.ReactNode;
}

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const domain = process.env.DOMAIN ?? 'localhost:3000';
const url = path.join(
  `${protocol}://${domain}`,
  nextConfig.basePath,
  'api/trpc'
);

const TrpcProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [client] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url
        })
      ]
    })
  );

  return (
    <trpcClient.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcClient.Provider>
  );
};

export { TrpcProvider };
