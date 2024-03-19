'use client';

import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpcClient } from '../../../lib/trpc/client';

interface Props {
  children: React.ReactNode;
  url: string;
}

const TrpcProvider = ({ children, url }: Props) => {
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
